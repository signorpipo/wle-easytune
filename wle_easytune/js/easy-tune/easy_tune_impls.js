
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

        //Setup
        this._myGamepad = PP.RightGamepad; //@EDIT get a gamepad here based on how you store it in your game

        this._myScrollVariableDelay = 0.5;
        this._myScrollVariableMinThreshold = 0.6;
        this._myScrollVariableButtonType = PP.ButtonType.SQUEEZE;
    }

    start(easyTuneComponent, easyTuneVariables, startVariableName) {
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

        this._updateVisibility();
    }

    _initializeWidgets(easyTuneComponent) {
        this._myWidgets[PP.EasyTuneVariable.Type.NUMBER] = new PP.EasyTuneNumberWidget(this._myGamepad, this._myScrollVariableButtonType);

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

    _updateVisibility() {
        let bottomButtonJustPressed = this._myGamepad.getButtonInfo(PP.ButtonType.BOTTOM_BUTTON).myIsPressed && !this._myGamepad.getButtonInfo(PP.ButtonType.BOTTOM_BUTTON).myIsPrevPressed;
        let topButtonJustPressed = this._myGamepad.getButtonInfo(PP.ButtonType.TOP_BUTTON).myIsPressed && !this._myGamepad.getButtonInfo(PP.ButtonType.TOP_BUTTON).myIsPrevPressed;

        if ((bottomButtonJustPressed && this._myGamepad.getButtonInfo(PP.ButtonType.TOP_BUTTON).myIsPressed) ||
            (topButtonJustPressed && this._myGamepad.getButtonInfo(PP.ButtonType.BOTTOM_BUTTON).myIsPressed)) {
            this._toggleVisibility();
        }
    }

    _toggleVisibility() {
        this._myIsVisible = !this._myIsVisible;
        this._myCurrentWidget.setVisible(this._myIsVisible);
    }

    _updateScrollVariable(dt) {
        if (this._myGamepad.getButtonInfo(this._myScrollVariableButtonType).myIsPressed) {
            let x = this._myGamepad.getAxesInfo().myAxes[0];
            if (Math.abs(x) > this._myScrollVariableMinThreshold) {
                this._myScrollVariableTimer += dt;
                while (this._myScrollVariableTimer > this._myScrollVariableDelay) {
                    this._myScrollVariableTimer -= this._myScrollVariableDelay;
                    this._scrollVariable(Math.sign(x));
                }
            } else {
                this._myScrollVariableTimer = this._myScrollVariableDelay;
            }
        } else {
            this._myScrollVariableTimer = this._myScrollVariableDelay;
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
};

PP.EasyTune.Handedness = {
    NONE: 0,
    LEFT: 1,
    RIGHT: 2,
};