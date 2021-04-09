PP.EasyTuneVariable = class EasyTuneVariable {
    constructor(name, type, value) {
        this.myName = name;
        this.myType = type;

        this.myValue = value;

        this.myInitialValue = this.myValue;
    }
};

PP.EasyTuneVariable.Type = {
    NUMBER: 0
};

PP.EasyTuneNumber = class EasyTuneNumber extends PP.EasyTuneVariable {
    constructor(name, value, decimalPlaces, stepPerSecond) {
        super(name, PP.EasyTuneVariable.Type.NUMBER, value);

        this.myDecimalPlaces = decimalPlaces;
        this.myStepPerSecond = stepPerSecond;

        this.myRealValue = value;
        this.myInitialStepPerSecond = this.myStepPerSecond;
    }
};

PP.EasyTuneInteger = class EasyTuneInteger extends PP.EasyTuneNumber {
    constructor(name, value, stepPerSecond) {
        super(name, value, 0, stepPerSecond);
    }
};