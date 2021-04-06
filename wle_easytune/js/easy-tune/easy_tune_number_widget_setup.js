PP.EasyTuneNumberWidgetSetup = class EasyTuneNumberWidgetSetup {

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
        this.myMainObjectTransforms[PP.EasyTune.Handedness.LEFT].myPosition = [-0.165, -0.025, -0.155];
        this.myMainObjectTransforms[PP.EasyTune.Handedness.LEFT].myRotation = [-0.645, 0.425, 0.25, 0.584];
        glMatrix.quat.normalize(this.myMainObjectTransforms[PP.EasyTune.Handedness.LEFT].myRotation, this.myMainObjectTransforms[PP.EasyTune.Handedness.LEFT].myRotation);

        this.myMainObjectTransforms[PP.EasyTune.Handedness.RIGHT] = {};
        this.myMainObjectTransforms[PP.EasyTune.Handedness.RIGHT].myPosition = [0.231, 0.005, -0.061];
        this.myMainObjectTransforms[PP.EasyTune.Handedness.RIGHT].myRotation = [-0.645, -0.425, -0.25, 0.584];
        glMatrix.quat.normalize(this.myMainObjectTransforms[PP.EasyTune.Handedness.RIGHT].myRotation, this.myMainObjectTransforms[PP.EasyTune.Handedness.RIGHT].myRotation);

        this.myCursorTargetCollisionCollider = 2; // box
        this.myCursorTargetCollisionGroup = 7;
        this.myCursorTargetCollisionThickness = 0.001;

        this.myDefaultTextColor = [255 / 255, 255 / 255, 255 / 255, 1];

        this.myColliderZPosition = 0.027;

        this.myTextAlignment = 2; // center
        this.myTextJustification = 2; // middle
        this.myTextOutlineRange = [0.45, 0.45];
        this.myTextColor = this.myDefaultTextColor;
        this.myTextOutlineColor = this.myDefaultTextColor;

        //Display
        this.myDisplayPanelPosition = [0, 0.1, 0];

        this.myDisplayBackgroundScale = [0.200, 0.055, 1];

        this.myVariableLabelPanelPosition = [0, 0.03, 0.01];
        this.myVariableLabelTextScale = [0.19, 0.19, 0.19];

        this.myPreviousCursorTargetPosition = [-0.04, 0, 0];
        this.myPreviousCursorTargetPosition[2] = this.myColliderZPosition - this.myVariableLabelPanelPosition[2] - this.myDisplayPanelPosition[2];
        this.myPreviousCollisionExtents = [0.03, 0.015, 1];
        this.myPreviousCollisionExtents[2] = this.myCursorTargetCollisionThickness;

        this.myNextCursorTargetPosition = [0.04, 0, 0];
        this.myNextCursorTargetPosition[2] = this.myColliderZPosition - this.myVariableLabelPanelPosition[2];
        this.myNextCollisionExtents = [0.03, 0.015, 1];
        this.myNextCollisionExtents[2] = this.myCursorTargetCollisionThickness;

        this.myValuePanelPosition = [0, -0.02, 0.01];
        this.myValueTextScale = [0.4, 0.4, 0.4];

        this.myResetValueCursorTargetPosition = [0, 0, 0];
        this.myResetValueCursorTargetPosition[2] = this.myColliderZPosition - this.myValuePanelPosition[2];
        this.myResetValueCollisionExtents = [0.065, 0.015, 1];
        this.myResetValueCollisionExtents[2] = this.myCursorTargetCollisionThickness;

        //Step
        this.myStepPanelPosition = [0, -0.035, 0.01];

        this.myStepBackgroundScale = [0.19, 0.065, 1];
        this.myStepBackgroundColor = [70 / 255, 70 / 255, 70 / 255, 1];

        this.myStepLabelPanelPosition = [0, 0.036, 0.01];
        this.myStepLabelTextScale = [0.19, 0.19, 0.19];

        this.myResetStepCursorTargetPosition = [0, 0, 0];
        this.myResetStepCursorTargetPosition[2] = this.myColliderZPosition - this.myStepLabelPanelPosition[2] - this.myStepPanelPosition[2];
        this.myResetStepCollisionExtents = [0.04, 0.015, 1];
        this.myResetStepCollisionExtents[2] = this.myCursorTargetCollisionThickness;

        this.myStepButtonsPanelPosition = [0, -0.025, 0.01];

        this.myStepButtonBackgroundScale = [0.04, 0.02, 1];

        this.myStepButtonTextScale = [0.18, 0.18, 0.18];
        this.myStepButtonTextPosition = [0, 0, 0.007];

        this.myStepButtonCursorTargetPosition = [0, 0, 0];
        this.myStepButtonCursorTargetPosition[2] = this.myColliderZPosition - this.myStepPanelPosition[2] - this.myStepButtonsPanelPosition[2];
        this.myStepButtonCollisionExtents = this.myStepButtonBackgroundScale;
        this.myStepButtonCollisionExtents[2] = this.myCursorTargetCollisionThickness;

        this.myStepButtonsSetupList = [];
        {
            let numberOfButtons = 4;
            let buttonsHorizontalSpace = this.myStepBackgroundScale[0] * 2;
            //3 at start, 2 between buttons, 3 at end
            let numberOfSpacesBetweenButtons = 3 + 6 + 3;

            let spaceWidth = Math.max((buttonsHorizontalSpace - numberOfButtons * this.myStepButtonBackgroundScale[0] * 2) / numberOfSpacesBetweenButtons, 0);
            let halfButtonWidth = this.myStepButtonBackgroundScale[0];
            let currentPosition = - buttonsHorizontalSpace / 2 + spaceWidth * 3 + halfButtonWidth;

            for (let i = 0; i < numberOfButtons; ++i) {
                this.myStepButtonsSetupList[i] = {};
                this.myStepButtonsSetupList[i].myPosition = [currentPosition, 0, 0];
                currentPosition += halfButtonWidth + spaceWidth * 2 + halfButtonWidth;
            }

            this.myStepButtonsSetupList[0].myText = "x0.01";
            this.myStepButtonsSetupList[1].myText = "x0.1";
            this.myStepButtonsSetupList[2].myText = "x10";
            this.myStepButtonsSetupList[3].myText = "x100";
        }

        //Pointer
        {
            let spaceBetweenPanels = Math.abs((this.myDisplayPanelPosition[1] - this.myDisplayBackgroundScale[1]) - (this.myStepPanelPosition[1] + this.myStepBackgroundScale[1]));
            let pointerCollisionHalfHeight = this.myDisplayBackgroundScale[1] + this.myStepBackgroundScale[1] + spaceBetweenPanels / 2;
            this.myPointerCollisionExtents = [this.myDisplayPanelPosition[0], pointerCollisionHalfHeight, this.myCursorTargetCollisionThickness];
        }

        this.myPointerCursorTargetPosition = [0, 0, 0];
        this.myPointerCursorTargetPosition[1] = (this.myDisplayBackgroundScale[1] + this.myDisplayBackgroundScale[1]) - this.myPointerCollisionExtents[1];
        this.myPointerCursorTargetPosition[2] = this.myColliderZPosition - 0.0001; // a little behind the button target to avoid hiding it
    }

    _initializeRuntimeSetup() {
    }
};