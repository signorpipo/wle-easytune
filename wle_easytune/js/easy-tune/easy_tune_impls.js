
PP.EasyTune = class EasyTune {

    constructor() {
        this._myWidgets = [];

        this._myEasyTuneVariables = null;
        this._myEasyTuneLastSize = 0;
        this._myVariableNames = null;

        this._myCurrentWidget = null;
        this._myCurrentVariable = null;

        this._myScrollVariableTimer = 0;

        this._myIsVisible = true;
        this._myVisibilityButtonVisible = false;

        this._myRightGamepad = PP.RightGamepad; //@EDIT get right gamepad here based on how you store it in your game
        this._myLeftGamepad = PP.LeftGamepad; //@EDIT get left gamepad here based on how you store it in your game

        this._mySetup = new PP.EasyTuneWidgetSetup();
        this._myUI = new PP.EasyTuneWidgetUI();

        this._myGamepad = null;
        if (this._mySetup.myGamepadHandedness == PP.EasyTune.Handedness.RIGHT) {
            this._myGamepad = this._myRightGamepad;
        } else if (this._mySetup.myGamepadHandedness == PP.EasyTune.Handedness.LEFT) {
            this._myGamepad = this._myLeftGamepad;
        }
    }

    start(easyTuneComponent, easyTuneVariables, startVariableName) {
        this._myVisibilityButtonVisible = easyTuneComponent._myShowVisibilityButton;
        if (this._myVisibilityButtonVisible) {
            this._myUI.build(easyTuneComponent, this._mySetup);
            this._addListeners();
        }

        this._myEasyTuneVariables = easyTuneVariables;
        this._myEasyTuneLastSize = this._myEasyTuneVariables.size;
        this._myVariableNames = Array.from(this._myEasyTuneVariables.keys());

        if (this._myEasyTuneVariables.has(startVariableName)) {
            this._myCurrentVariable = this._myEasyTuneVariables.get(startVariableName);
        } else if (this._myEasyTuneVariables.size > 0) {
            this._myCurrentVariable = this._myEasyTuneVariables.get(this._myVariableNames[0]);
        }

        this._initializeWidgets(easyTuneComponent);

        if (!easyTuneComponent._myShowOnStart) {
            this._toggleVisibility();
        }
    }

    update(dt) {
        if (this._myEasyTuneVariables.size != this._myEasyTuneLastSize) {
            this._refreshEasyTuneVariables();
        }

        if (this._myIsVisible && this._myEasyTuneVariables.size > 0) {
            if (this._myCurrentWidget) {
                this._myCurrentWidget.update(dt);
            }
            this._updateGamepadScrollVariable(dt);
        }

        if (this._myVisibilityButtonVisible) {
            this._myUI.update(dt);
        }

        this._updateGamepadWidgetVisibility();
    }

    _initializeWidgets(easyTuneComponent) {
        this._myWidgets[PP.EasyTuneVariableType.NUMBER] = new PP.EasyTuneNumberWidget(this._myGamepad, this._mySetup.myScrollVariableButtonType);

        for (let item of this._myWidgets) {
            item.start(easyTuneComponent);
            item.setVisible(false);
            item.registerScrollVariableEvent(this, this._scrollVariable.bind(this));
        }

        this._selectCurrentWidget();
    }

    _selectCurrentWidget() {
        if (this._myEasyTuneVariables.size <= 0) {
            return;
        }

        if (this._myCurrentWidget) {
            this._myCurrentWidget.setVisible(false);
        }

        if (this._myCurrentVariable.myType in this._myWidgets) {
            this._myCurrentWidget = this._myWidgets[this._myCurrentVariable.myType];
            this._myCurrentWidget.setEasyTuneVariable(this._myCurrentVariable, this._createIndexString());
            this._myCurrentWidget.setVisible(this._myIsVisible);
        } else {
            this._myCurrentWidget = null;
        }
    }

    _refreshEasyTuneVariables() {
        this._myVariableNames = Array.from(this._myEasyTuneVariables.keys());
        this._myEasyTuneLastSize = this._myEasyTuneVariables.size;

        if (this._myEasyTuneVariables.size > 0) {
            if (this._myCurrentVariable && this._myEasyTuneVariables.has(this._myCurrentVariable.myName)) {
                this._myCurrentVariable = this._myEasyTuneVariables.get(this._myCurrentVariable.myName);
            } else {
                this._myCurrentVariable = this._myEasyTuneVariables.get(this._myVariableNames[0]);
            }

            this._selectCurrentWidget();
        } else {
            this._myCurrentVariable = null;
            if (this._myCurrentWidget) {
                this._myCurrentWidget.setVisible(false);
                this._myCurrentWidget = null;
            }
        }
    }

    _updateGamepadWidgetVisibility() {
        if (this._myGamepad) {
            let bottomButtonJustPressed = this._myGamepad.getButtonInfo(PP.ButtonType.BOTTOM_BUTTON).myIsPressed && !this._myGamepad.getButtonInfo(PP.ButtonType.BOTTOM_BUTTON).myIsPrevPressed;
            let topButtonJustPressed = this._myGamepad.getButtonInfo(PP.ButtonType.TOP_BUTTON).myIsPressed && !this._myGamepad.getButtonInfo(PP.ButtonType.TOP_BUTTON).myIsPrevPressed;

            if ((bottomButtonJustPressed && this._myGamepad.getButtonInfo(PP.ButtonType.TOP_BUTTON).myIsPressed) ||
                (topButtonJustPressed && this._myGamepad.getButtonInfo(PP.ButtonType.BOTTOM_BUTTON).myIsPressed)) {
                this._toggleVisibility();
            }
        }
    }

    _toggleVisibility() {
        this._myIsVisible = !this._myIsVisible;

        if (this._myVisibilityButtonVisible) {
            let textMaterial = this._myUI.myVisibilityButtonTextComponent.material;
            let backgroundMaterial = this._myUI.myVisibilityButtonBackgroundComponent.material;
            if (this._myIsVisible) {
                textMaterial.color = this._mySetup.myDefaultTextColor;
                backgroundMaterial.color = this._mySetup.myBackgroundColor;
            } else {
                textMaterial.color = this._mySetup.myButtonDisabledTextColor;
                backgroundMaterial.color = this._mySetup.myButtonDisabledBackgroundColor;
            }
        }

        if (this._myCurrentWidget) {
            if (this._myEasyTuneVariables.size > 0) {
                this._myCurrentWidget.setVisible(this._myIsVisible);
            } else {
                this._myCurrentWidget.setVisible(false);
            }
        }

        if (this._myIsVisible) {
            this._refreshEasyTuneVariables();
        }
    }

    _updateGamepadScrollVariable(dt) {
        if (this._myGamepad && this._myGamepad.getButtonInfo(this._mySetup.myScrollVariableButtonType).myIsPressed) {
            let x = this._myGamepad.getAxesInfo().myAxes[0];
            if (Math.abs(x) > this._mySetup.myScrollVariableMinThreshold) {
                this._myScrollVariableTimer += dt;
                while (this._myScrollVariableTimer > this._mySetup.myScrollVariableDelay) {
                    this._myScrollVariableTimer -= this._mySetup.myScrollVariableDelay;
                    this._scrollVariable(Math.sign(x));
                }
            } else {
                this._myScrollVariableTimer = this._mySetup.myScrollVariableDelay;
            }
        } else {
            this._myScrollVariableTimer = this._mySetup.myScrollVariableDelay;
        }
    }

    _scrollVariable(amount) {
        if (this._myEasyTuneVariables.size <= 0) {
            return;
        }

        let variableIndex = this._getVariableIndex(this._myCurrentVariable);
        if (variableIndex >= 0) {
            let newIndex = (((variableIndex + amount) % this._myVariableNames.length) + this._myVariableNames.length) % this._myVariableNames.length; //manage negative numbers
            if (this._myEasyTuneVariables.has(this._myVariableNames[newIndex])) {
                this._myCurrentVariable = this._myEasyTuneVariables.get(this._myVariableNames[newIndex]);
                this._selectCurrentWidget();
            } else {
                this._refreshEasyTuneVariables();
            }
        } else {
            this._refreshEasyTuneVariables();
        }
    }

    _createIndexString() {
        let indexString = " (";
        let index = (this._getVariableIndex(this._myCurrentVariable) + 1).toString();
        let length = (this._myEasyTuneVariables.size).toString();
        while (index.length < length.length) {
            index = "0".concat(index);
        }

        indexString = indexString.concat(index).concat(" - ").concat(length).concat(")");

        return indexString;
    }

    _getVariableIndex(variable) {
        let variableIndex = this._myVariableNames.indexOf(variable.myName);
        return variableIndex;
    }

    _addListeners() {
        let ui = this._myUI;

        ui.myVisibilityButtonCursorTargetComponent.addClickFunction(this._toggleVisibility.bind(this));
        ui.myVisibilityButtonCursorTargetComponent.addHoverFunction(this._visibilityHover.bind(this, ui.myVisibilityButtonBackgroundComponent.material));
        ui.myVisibilityButtonCursorTargetComponent.addUnHoverFunction(this._visibilityUnHover.bind(this, ui.myVisibilityButtonBackgroundComponent.material));
    }

    _visibilityHover(material) {
        material.color = this._mySetup.myButtonHoverColor;
    }

    _visibilityUnHover(material) {
        if (this._myIsVisible) {
            material.color = this._mySetup.myBackgroundColor;
        } else {
            material.color = this._mySetup.myButtonDisabledBackgroundColor;
        }
    }
};

PP.EasyTune.Handedness = {
    NONE: 0,
    LEFT: 1,
    RIGHT: 2,
};

PP.InputSourceType = {
    NONE: 0,
    GAMEPAD: 1,
    HAND: 2
};