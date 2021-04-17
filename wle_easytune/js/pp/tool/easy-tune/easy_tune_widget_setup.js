PP.EasyTuneWidgetSetup = class EasyTuneWidgetSetup {

    constructor() {
        this._initializeCommonSetup();
        this._initializeBuildSetup();
        this._initializeRuntimeSetup();
    }

    _initializeCommonSetup() {
        this.myBackgroundColor = [46 / 255, 46 / 255, 46 / 255, 1];
    }

    _initializeBuildSetup() {
        //General
        this.myCursorTargetCollisionCollider = 2; // box
        this.myCursorTargetCollisionGroup = 7;
        this.myCursorTargetCollisionThickness = 0.001;

        this.myDefaultTextColor = [255 / 255, 255 / 255, 255 / 255, 1];

        this.myTextAlignment = 2; // center
        this.myTextJustification = 2; // middle
        this.myTextOutlineRange = [0.45, 0.45];
        this.myTextColor = this.myDefaultTextColor;
        this.myTextOutlineColor = this.myDefaultTextColor;

        //VisibilityButton
        {
            this.myVisibilityButtonBackgroundScale = [0.015, 0.015, 1];
            this.myVisibilityButtonTextPosition = [0, 0, 0.007];
            this.myVisibilityButtonTextScale = [0.18, 0.18, 0.18];

            let distanceBetweenToolsVisibilityButton = 0.01;
            let toolIndex = 1;
            let buttonXOffset = this.myVisibilityButtonBackgroundScale[0] * (2 * toolIndex) + distanceBetweenToolsVisibilityButton * toolIndex;

            this.myVisibilityButtonPosition = [];
            this.myVisibilityButtonPosition[PP.ConsoleVRWidget.Handedness.NONE] = {};
            this.myVisibilityButtonPosition[PP.ConsoleVRWidget.Handedness.NONE].myPosition = [-0.202 + buttonXOffset, 0.028, 0.015];

            this.myVisibilityButtonPosition[PP.ConsoleVRWidget.Handedness.LEFT] = {};
            this.myVisibilityButtonPosition[PP.ConsoleVRWidget.Handedness.LEFT].myPosition = [-0.202 + buttonXOffset, 0.028, 0.015];

            this.myVisibilityButtonPosition[PP.ConsoleVRWidget.Handedness.RIGHT] = {};
            this.myVisibilityButtonPosition[PP.ConsoleVRWidget.Handedness.RIGHT].myPosition = [0.195 - buttonXOffset, 0.028, 0.015];

            this.myVisibilityButtonText = "E";

            this.myVisibilityButtonCursorTargetPosition = [0, 0, 0];
            this.myVisibilityButtonCursorTargetPosition[2] = this.myVisibilityButtonTextPosition[2];
            this.myVisibilityButtonCollisionExtents = this.myVisibilityButtonBackgroundScale;
            this.myVisibilityButtonCollisionExtents[2] = this.myCursorTargetCollisionThickness;
        }
    }

    _initializeRuntimeSetup() {
        this.myPivotObjectGamepadRotation = [];
        this.myPivotObjectGamepadRotation[PP.ConsoleVRWidget.Handedness.LEFT] = [-0.645, 0.425, 0.25, 0.584];
        this.myPivotObjectGamepadRotation[PP.ConsoleVRWidget.Handedness.RIGHT] = [-0.645, -0.425, -0.25, 0.584];
        glMatrix.quat.normalize(this.myPivotObjectGamepadRotation[PP.ConsoleVRWidget.Handedness.LEFT], this.myPivotObjectGamepadRotation[PP.ConsoleVRWidget.Handedness.LEFT]);
        glMatrix.quat.normalize(this.myPivotObjectGamepadRotation[PP.ConsoleVRWidget.Handedness.RIGHT], this.myPivotObjectGamepadRotation[PP.ConsoleVRWidget.Handedness.RIGHT]);

        this.myPivotObjectHandRotation = [];
        this.myPivotObjectHandRotation[PP.ConsoleVRWidget.Handedness.LEFT] = [-0.084, 0.697, -0.218, 0.678];
        this.myPivotObjectHandRotation[PP.ConsoleVRWidget.Handedness.RIGHT] = [-0.156, -0.756, 0.236, 0.590];
        glMatrix.quat.normalize(this.myPivotObjectHandRotation[PP.ConsoleVRWidget.Handedness.LEFT], this.myPivotObjectHandRotation[PP.ConsoleVRWidget.Handedness.LEFT]);
        glMatrix.quat.normalize(this.myPivotObjectHandRotation[PP.ConsoleVRWidget.Handedness.RIGHT], this.myPivotObjectHandRotation[PP.ConsoleVRWidget.Handedness.RIGHT]);

        this.myGamepadHandedness = PP.EasyTuneWidget.Handedness.RIGHT;

        this.myButtonHoverColor = [150 / 255, 150 / 255, 150 / 255, 1];
        this.myButtonDisabledTextColor = this.myBackgroundColor;
        this.myButtonDisabledBackgroundColor = [110 / 255, 110 / 255, 110 / 255, 1];

        this.myScrollVariableDelay = 0.5;
        this.myScrollVariableMinThreshold = 0.6;
        this.myScrollVariableButtonType = PP.ButtonType.SQUEEZE;
    }
};