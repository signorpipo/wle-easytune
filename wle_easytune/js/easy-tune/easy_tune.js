WL.registerComponent('easy-tune', {
    _myHandedness: { type: WL.Type.Enum, values: ['none', 'left', 'right'], default: 'none' },
    _myShowOnStart: { type: WL.Type.Bool, default: false },
    _myShowVisibilityButton: { type: WL.Type.Bool, default: false },
    _myPlaneMaterial: { type: WL.Type.Material, default: null },
    _myTextMaterial: { type: WL.Type.Material, default: null }
}, {
    init: function () {
        this._myWidget = new PP.EasyTuneWidget();

        //Examples
        //Number: PP.EasyTuneVariables.addVariable(new PP.EasyTuneNumber("Speed", 10.32, 0.01, 3));
        //Integer: PP.EasyTuneVariables.addVariable(new PP.EasyTuneInteger("Lives", 3, 1));
    },
    start: function () {
        this._myWidget.start(this, PP.EasyTuneVariables, "X");
    },
    update: function (dt) {
        this._myWidget.update(dt);
    }
});