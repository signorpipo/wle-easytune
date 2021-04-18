WL.registerComponent('custom-0', {
    param: { type: WL.Type.Float, default: 1.0 },
}, {
    init: function () {
    },
    start: function () {
        let a = [];
        glMatrix.quat2.identity(a);
        console.log("transform", a);
    },
    update: function (dt) {
    },
});