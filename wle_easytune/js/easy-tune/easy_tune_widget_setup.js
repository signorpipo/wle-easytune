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
        this.myMainObjectTransforms = [];
        this.myMainObjectTransforms[PP.EasyTune.Handedness.NONE] = {};
        this.myMainObjectTransforms[PP.EasyTune.Handedness.NONE].myPosition = [0, 0, 0];
        this.myMainObjectTransforms[PP.EasyTune.Handedness.NONE].myRotation = [0, 0, 0, 1];

        this.myMainObjectTransforms[PP.EasyTune.Handedness.LEFT] = {};
        this.myMainObjectTransforms[PP.EasyTune.Handedness.LEFT].myPosition = [0, 0, 0];
        this.myMainObjectTransforms[PP.EasyTune.Handedness.LEFT].myRotation = [-0.645, 0.425, 0.25, 0.584];
        glMatrix.quat.normalize(this.myMainObjectTransforms[PP.EasyTune.Handedness.LEFT].myRotation, this.myMainObjectTransforms[PP.EasyTune.Handedness.LEFT].myRotation);

        this.myMainObjectTransforms[PP.EasyTune.Handedness.RIGHT] = {};
        this.myMainObjectTransforms[PP.EasyTune.Handedness.RIGHT].myPosition = [0, 0, 0];
        this.myMainObjectTransforms[PP.EasyTune.Handedness.RIGHT].myRotation = [-0.645, -0.425, -0.25, 0.584];
        glMatrix.quat.normalize(this.myMainObjectTransforms[PP.EasyTune.Handedness.RIGHT].myRotation, this.myMainObjectTransforms[PP.EasyTune.Handedness.RIGHT].myRotation);

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
        this.myVisibilityButtonPosition = [-0.2 + 0.015 + 0.01 + 0.015, 0.038, 0];
        this.myVisibilityButtonBackgroundScale = [0.015, 0.015, 1];
        this.myVisibilityButtonTextPosition = [0, 0, 0.007];
        this.myVisibilityButtonTextScale = [0.18, 0.18, 0.18];

        this.myVisibilityButtonText = "E";

        this.myVisibilityButtonCursorTargetPosition = [0, 0, 0];
        this.myVisibilityButtonCursorTargetPosition[2] = this.myVisibilityButtonTextPosition[2];
        this.myVisibilityButtonCollisionExtents = this.myVisibilityButtonBackgroundScale;
        this.myVisibilityButtonCollisionExtents[2] = this.myCursorTargetCollisionThickness;
    }

    _initializeRuntimeSetup() {
        this.myGamepadHandedness = PP.EasyTune.Handedness.RIGHT;

        this.myButtonHoverColor = [150 / 255, 150 / 255, 150 / 255, 1];
        this.myButtonDisabledTextColor = this.myBackgroundColor;
        this.myButtonDisabledBackgroundColor = [110 / 255, 110 / 255, 110 / 255, 1];

        this.myScrollVariableDelay = 0.5;
        this.myScrollVariableMinThreshold = 0.6;
        this.myScrollVariableButtonType = PP.ButtonType.SQUEEZE;
    }
};