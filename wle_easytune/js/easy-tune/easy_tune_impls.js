
PP.EasyTune = class EasyTune {

    constructor() {
        this._myWidgets = [];

        this._myGamepad = null;

        this._myEasyTuneVariables = null;
        this._myVariableNames = null;

        this._myCurrentWidget = null;
        this._myCurrentVariable = null;

        this._myScrollVariableTimer = 0;

        this._myIsVisible = true;

        this._myGamepad = PP.RightGamepad; //@EDIT get a gamepad here based on how you store it in your game

        this._mySetup = new PP.EasyTuneWidgetSetup();
        this._myUI = new PP.EasyTuneWidgetUI();

        this._myVisibilityButtonVisible = false;
    }

    start(easyTuneComponent, easyTuneVariables, startVariableName) {
        this._myVisibilityButtonVisible = easyTuneComponent._myShowVisibilityButton;
        if (this._myVisibilityButtonVisible) {
            this._myUI.build(easyTuneComponent, this._mySetup);
            this._addListeners();
        }

        this._myEasyTuneVariables = easyTuneVariables;
        this._myVariableNames = Array.from(this._myEasyTuneVariables.keys());

        if (this._myEasyTuneVariables.has(startVariableName)) {
            this._myCurrentVariable = this._myEasyTuneVariables.get(startVariableName);
        } else {
            this._myCurrentVariable = this._myEasyTuneVariables.get(this._myVariableNames[0]);
        }

        this._initializeWidgets(easyTuneComponent);

        if (!easyTuneComponent._myShowOnStart) {
            this._toggleVisibility();
        }
    }

    update(dt) {
        if (this._myIsVisible) {
            this._myCurrentWidget.update(dt);
            this._updateScrollVariable(dt);
        }

        if (this._myVisibilityButtonVisible) {
            this._myUI.update(dt);
        }

        this._updateWidgetVisibility();
    }

    _initializeWidgets(easyTuneComponent) {
        this._myWidgets[PP.EasyTuneVariable.Type.NUMBER] = new PP.EasyTuneNumberWidget(this._myGamepad, this._mySetup.myScrollVariableButtonType);

        for (let item of this._myWidgets) {
            item.start(easyTuneComponent);
            item.setVisible(false);
            item.registerScrollVariableEvent(this, this._scrollVariable.bind(this));
        }

        this._selectCurrentWidget();
    }

    _selectCurrentWidget() {
        if (this._myCurrentWidget) {
            this._myCurrentWidget.setVisible(false);
        }

        this._myCurrentWidget = this._myWidgets[this._myCurrentVariable.myType];
        this._myCurrentWidget.setEasyTuneVariable(this._myCurrentVariable, this._createIndexString());
        this._myCurrentWidget.setVisible(true);
    }

    _updateWidgetVisibility() {
        let bottomButtonJustPressed = this._myGamepad.getButtonInfo(PP.ButtonType.BOTTOM_BUTTON).myIsPressed && !this._myGamepad.getButtonInfo(PP.ButtonType.BOTTOM_BUTTON).myIsPrevPressed;
        let topButtonJustPressed = this._myGamepad.getButtonInfo(PP.ButtonType.TOP_BUTTON).myIsPressed && !this._myGamepad.getButtonInfo(PP.ButtonType.TOP_BUTTON).myIsPrevPressed;

        if ((bottomButtonJustPressed && this._myGamepad.getButtonInfo(PP.ButtonType.TOP_BUTTON).myIsPressed) ||
            (topButtonJustPressed && this._myGamepad.getButtonInfo(PP.ButtonType.BOTTOM_BUTTON).myIsPressed)) {
            this._toggleVisibility();
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

        this._myCurrentWidget.setVisible(this._myIsVisible);
    }

    _updateScrollVariable(dt) {
        if (this._myGamepad.getButtonInfo(this._mySetup.myScrollVariableButtonType).myIsPressed) {
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
        let variableIndex = this._getVariableIndex(this._myCurrentVariable);
        let newIndex = (((variableIndex + amount) % this._myVariableNames.length) + this._myVariableNames.length) % this._myVariableNames.length; //manage negative numbers

        this._myCurrentVariable = this._myEasyTuneVariables.get(this._myVariableNames[newIndex]);
        this._selectCurrentWidget();
    }

    _createIndexString() {
        let indexString = " (";
        let index = this._getVariableIndex(this._myCurrentVariable).toString();
        let length = (this._myEasyTuneVariables.size - 1).toString();
        while (index.length < length.length) {
            index = "0".concat(index);
        }

        indexString = indexString.concat(index).concat(" - ").concat(length).concat(")");

        return indexString;
    }

    _getVariableIndex(variable) {
        let variableIndex = this._myVariableNames.findIndex((function (item) { return item == variable.myName; }).bind(this));

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