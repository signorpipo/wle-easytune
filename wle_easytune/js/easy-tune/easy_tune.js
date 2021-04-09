WL.registerComponent('easy-tune', {
    _myHandedness: { type: WL.Type.Enum, values: ['none', 'left', 'right'], default: 'none' },
    _myShowOnStart: { type: WL.Type.Bool, default: false },
    _myPlaneMaterial: { type: WL.Type.Material, default: null },
    _myTextMaterial: { type: WL.Type.Material, default: null }
}, {
    init: function () {
        this._myImpl = new PP.EasyTune();
        this.fillVariables();
    },
    start: function () {
        this._myImpl.start(this, PP.EasyTuneVariables, "Speed");
    },
    update: function (dt) {
        this._myImpl.update(dt);
    },
    fillVariables: function () {
        this.addVariable(new PP.EasyTuneNumber("Speed", 10.32, 4, 0.01));
        this.addVariable(new PP.EasyTuneInteger("Lives", 3, 1));
    },
    addVariable: function (variable) {
        PP.EasyTuneVariables.set(variable.myName, variable);
    }
});

PP.EasyTuneVariables = new Map();