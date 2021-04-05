
PP.EasyTuneNumberWidget = class EasyTuneNumberWidget {

    constructor(type, leftGamepad, rightGamepad) {
        this._myType = type;

        this._myLeftGamepad = leftGamepad;
        this._myRightGamepad = rightGamepad;

        this._myUI = new PP.EasyTuneNumberWidgetUI();
        this._mySetup = new PP.EasyTuneNumberWidgetSetup();
    }

    start(easyTuneComponent) {
        this._myUI.build(easyTuneComponent, this._mySetup);
    }

    update(dt) { }
};

PP.EasyTuneNumberWidget.Type = {
    INT: 0,
    FLOAT: 1
};