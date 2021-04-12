//Variable Map
PP.EasyTuneVariableMap = class EasyTuneVariableMap extends Map {
    constructor() {
        super();
    }

    addVariable(variable) {
        this.set(variable.myName, variable);
    }
};

PP.EasyTuneVariables = new PP.EasyTuneVariableMap();

//Variable Types
PP.EasyTuneVariableType = {
    NUMBER: 0
};

PP.EasyTuneVariable = class EasyTuneVariable {
    constructor(name, type, value) {
        this.myName = name;
        this.myType = type;

        this.myValue = value;

        this.myInitialValue = this.myValue;
    }
};

PP.EasyTuneNumber = class EasyTuneNumber extends PP.EasyTuneVariable {
    constructor(name, value, stepPerSecond, decimalPlaces) {
        super(name, PP.EasyTuneVariableType.NUMBER, value);

        this.myDecimalPlaces = decimalPlaces;
        this.myStepPerSecond = stepPerSecond;

        this.myRealValue = value;
        this.myInitialStepPerSecond = this.myStepPerSecond;
    }
};

PP.EasyTuneInteger = class EasyTuneInteger extends PP.EasyTuneNumber {
    constructor(name, value, stepPerSecond) {
        super(name, value, stepPerSecond, 0);
    }
};