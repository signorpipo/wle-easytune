WL.registerComponent('easy-tune', {
    _myHandedness: { type: WL.Type.Enum, values: ['none', 'left', 'right'], default: 'none' },
    _mShowOnStart: { type: WL.Type.Bool, default: false },
    _myPlaneMaterial: { type: WL.Type.Material, default: null },
    _myTextMaterial: { type: WL.Type.Material, default: null }
}, {
    init: function () {
        this._myImpl = new PP.EasyTune();
    },
    start: function () {
        this._myImpl.start(this);
    },
    update: function (dt) {
        this._myImpl.update(dt);
    }
});
