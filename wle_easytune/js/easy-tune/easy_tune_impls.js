
PP.EasyTune = class EasyTune {

    constructor() {
        this._myWidgets = [];

        this._myLeftGamepad = null;
        this._myRightGamepad = null;

    }

    start(easyTuneComponent) {
        this._myLeftGamepad = PP.LeftGamepad; //@EDIT get gamepad LEFT here based on how you store it in your game
        this._myRightGamepad = PP.RightGamepad; //@EDIT get gamepad RIGHT here based on how you store it in your game

        this._initializeWidgets(easyTuneComponent);
    }

    _initializeWidgets(easyTuneComponent) {
        this._myWidgets[PP.EasyTune.VariableType.INT] = new PP.EasyTuneNumberWidget(PP.EasyTuneNumberWidget.Type.INT, this._myLeftGamepad, this._myRightGamepad);
        this._myWidgets[PP.EasyTune.VariableType.INT].start(easyTuneComponent);
    }

    update(dt) { }
};

PP.EasyTune.Handedness = {
    NONE: 0,
    LEFT: 1,
    RIGHT: 2,
};

PP.EasyTune.VariableType = {
    INT: 0,
    FLOAT: 1
};