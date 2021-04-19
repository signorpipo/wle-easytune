WL.registerComponent('add-variables', {
}, {
    init: function () {
        PP.EasyTuneVariables.addVariable(new PP.EasyTuneNumber("Speed", 10.32, 0.01, 3));
        PP.EasyTuneVariables.addVariable(new PP.EasyTuneInteger("Lives", 3, 1));
    },
    start: function () {
    },
    update: function (dt) {
    },
});