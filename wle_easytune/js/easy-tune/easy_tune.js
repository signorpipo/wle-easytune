WL.registerComponent('easy-tune', {
    _myHandedness: { type: WL.Type.Enum, values: ['none', 'left', 'right'], default: 'none' },
    _myShowOnStart: { type: WL.Type.Bool, default: false },
    _myShowVisibilityButton: { type: WL.Type.Bool, default: false },
    _myPlaneMaterial: { type: WL.Type.Material, default: null },
    _myTextMaterial: { type: WL.Type.Material, default: null }
}, {
    init: function () {
        this._myImpl = new PP.EasyTune();
    },
    start: function () {
        this._myImpl.start(this, PP.EasyTuneVariables, "Speed");
    },
    update: function (dt) {
        this._myImpl.update(dt);
    }
});