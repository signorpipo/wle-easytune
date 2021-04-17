PP.ConsoleVRWidgetSetup = class ConsoleVRWidgetSetup {

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
        this.myCursorTargetCollisionGroup = 7; //keep this in sync with ConsoleVRSetup
        this.myCursorTargetCollisionThickness = 0.001;

        this.myDefaultTextColor = [255 / 255, 255 / 255, 255 / 255, 1];

        this.myTextAlignment = 2; // center
        this.myTextJustification = 2; // middle
        this.myTextOutlineRange = [0.45, 0.45];
        this.myTextColor = this.myDefaultTextColor;
        this.myTextOutlineColor = this.myDefaultTextColor;

        this.myMessageTypeColors = [];
        this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.LOG] = this.myDefaultTextColor;
        this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.ERROR] = [255 / 255, 40 / 255, 40 / 255, 1];
        this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.WARN] = [250 / 255, 220 / 255, 40 / 255, 1];
        this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.INFO] = [60 / 255, 200 / 255, 255 / 255, 1];

        //Messages
        this.myMessagesPanelPosition = [0, 0.075, 0];

        this.myMessagesBackgroundScale = [0.34, 0.15, 1];

        {
            let xPaddingPercentage = 0.03;
            let yPaddingPercentage = xPaddingPercentage * this.myMessagesBackgroundScale[0] / this.myMessagesBackgroundScale[1] * 0.8; //a bit less padding
            let xPosition = -this.myMessagesBackgroundScale[0] + this.myMessagesBackgroundScale[0] * xPaddingPercentage;
            let yPosition = this.myMessagesBackgroundScale[1] - this.myMessagesBackgroundScale[1] * yPaddingPercentage;
            this.myMessagesTextsPanelPosition = [xPosition, yPosition, 0.007];
        }
        this.myMessagesTextsPanelScale = [0.1, 0.1, 0.1];

        this.myMessagesTextStartString = ".\n"; // to avoid issue with text component padding
        this.myMessagesTextAlignment = 1; // left
        this.myMessagesTextJustification = 3; // top
        this.myMessagesTextOutlineRange = [0.45, 0.45];

        this.myMessagesTextColors = [];
        this.myMessagesTextColors[PP.ConsoleVRWidget.MessageType.LOG] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.LOG];
        this.myMessagesTextColors[PP.ConsoleVRWidget.MessageType.ERROR] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.ERROR];
        this.myMessagesTextColors[PP.ConsoleVRWidget.MessageType.WARN] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.WARN];
        this.myMessagesTextColors[PP.ConsoleVRWidget.MessageType.INFO] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.INFO];

        this.myMessagesTextOutlineColors = [];
        this.myMessagesTextOutlineColors[PP.ConsoleVRWidget.MessageType.LOG] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.LOG];
        this.myMessagesTextOutlineColors[PP.ConsoleVRWidget.MessageType.ERROR] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.ERROR];
        this.myMessagesTextOutlineColors[PP.ConsoleVRWidget.MessageType.WARN] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.WARN];
        this.myMessagesTextOutlineColors[PP.ConsoleVRWidget.MessageType.INFO] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.INFO];

        //Buttons     
        this.myButtonsPanelPosition = [0, -0.11, 0.015];

        this.myButtonBackgroundScale = [0.04, 0.02, 1];

        this.myButtonTextPosition = [0, 0, 0.0065];
        this.myButtonTextScale = [0.18, 0.18, 0.18];
        this.myButtonTextAlignment = this.myTextAlignment;
        this.myButtonTextJustification = this.myTextJustification;
        this.myButtonTextOutlineRange = this.myTextOutlineRange;
        this.myButtonTextColor = this.myTextColor;
        this.myButtonTextOutlineColor = this.myTextOutlineColor;

        this.myButtonCursorTargetPosition = [0, 0, 0];
        this.myButtonCursorTargetPosition[2] = this.myButtonTextPosition[2];

        this.myButtonsCollisionCollider = this.myCursorTargetCollisionCollider;
        this.myButtonsCollisionGroup = this.myCursorTargetCollisionGroup;
        this.myButtonsCollisionExtents = this.myButtonBackgroundScale;
        this.myButtonsCollisionExtents[2] = this.myCursorTargetCollisionThickness;

        this.myClearButtonTextLabel = "clear";
        this.myUpButtonTextLabel = "up";
        this.myDownButtonTextLabel = "down";

        this.myFilterButtonsTextColors = [];
        this.myFilterButtonsTextColors[PP.ConsoleVRWidget.MessageType.LOG] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.LOG];
        this.myFilterButtonsTextColors[PP.ConsoleVRWidget.MessageType.ERROR] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.ERROR];
        this.myFilterButtonsTextColors[PP.ConsoleVRWidget.MessageType.WARN] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.WARN];
        this.myFilterButtonsTextColors[PP.ConsoleVRWidget.MessageType.INFO] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.INFO];

        this.myFilterButtonsTextOutlineColors = [];
        this.myFilterButtonsTextOutlineColors[PP.ConsoleVRWidget.MessageType.LOG] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.LOG];
        this.myFilterButtonsTextOutlineColors[PP.ConsoleVRWidget.MessageType.ERROR] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.ERROR];
        this.myFilterButtonsTextOutlineColors[PP.ConsoleVRWidget.MessageType.WARN] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.WARN];
        this.myFilterButtonsTextOutlineColors[PP.ConsoleVRWidget.MessageType.INFO] = this.myMessageTypeColors[PP.ConsoleVRWidget.MessageType.INFO];

        this.myFilterButtonsTextLabel = [];
        this.myFilterButtonsTextLabel[PP.ConsoleVRWidget.MessageType.LOG] = "log";
        this.myFilterButtonsTextLabel[PP.ConsoleVRWidget.MessageType.ERROR] = "error";
        this.myFilterButtonsTextLabel[PP.ConsoleVRWidget.MessageType.WARN] = "warn";
        this.myFilterButtonsTextLabel[PP.ConsoleVRWidget.MessageType.INFO] = "info";

        //Buttons positioning
        {
            let numberOfButtons = 7;
            let buttonsHorizontalSpace = Math.max(0.68, this.myButtonBackgroundScale[0] * numberOfButtons);
            //2 at start, 3 between filters, 4 spaces between filter and clear and 4 spaces between clear and up/down, 1 space between up and down, 1 at end
            let numberOfSpacesBetweenButtons = 2 + 3 + 4 + 4 + 1 + 2;
            let spaceWidth = Math.max((buttonsHorizontalSpace - numberOfButtons * this.myButtonBackgroundScale[0] * 2) / numberOfSpacesBetweenButtons, 0);
            let halfButtonWidth = this.myButtonBackgroundScale[0];
            let initialPosition = - buttonsHorizontalSpace / 2;

            this.myFilterButtonsPositions = [];
            this.myFilterButtonsPositions[PP.ConsoleVRWidget.MessageType.LOG] = [initialPosition + spaceWidth * 2 + halfButtonWidth, 0, 0];
            this.myFilterButtonsPositions[PP.ConsoleVRWidget.MessageType.ERROR] = [this.myFilterButtonsPositions[PP.ConsoleVRWidget.MessageType.LOG][0] + halfButtonWidth + spaceWidth + halfButtonWidth, 0, 0];
            this.myFilterButtonsPositions[PP.ConsoleVRWidget.MessageType.WARN] = [this.myFilterButtonsPositions[PP.ConsoleVRWidget.MessageType.ERROR][0] + halfButtonWidth + spaceWidth + halfButtonWidth, 0, 0];
            this.myFilterButtonsPositions[PP.ConsoleVRWidget.MessageType.INFO] = [this.myFilterButtonsPositions[PP.ConsoleVRWidget.MessageType.WARN][0] + halfButtonWidth + spaceWidth + halfButtonWidth, 0, 0];

            this.myClearButtonPosition = [this.myFilterButtonsPositions[PP.ConsoleVRWidget.MessageType.INFO][0] + halfButtonWidth + spaceWidth * 4 + halfButtonWidth, 0, 0];
            this.myUpButtonPosition = [this.myClearButtonPosition[0] + halfButtonWidth + spaceWidth * 4 + halfButtonWidth, 0, 0];
            this.myDownButtonPosition = [this.myUpButtonPosition[0] + halfButtonWidth + spaceWidth + halfButtonWidth, 0, 0];
        }

        //Pointer
        this.myPointerCollisionCollider = this.myCursorTargetCollisionCollider;
        this.myPointerCollisionGroup = this.myCursorTargetCollisionGroup;

        {
            let spaceBetweenMessagesAndButtons = Math.abs((this.myMessagesPanelPosition[1] - this.myMessagesBackgroundScale[1]) - (this.myButtonsPanelPosition[1] + this.myButtonBackgroundScale[1]));
            let pointerCollisionHalfHeight = this.myMessagesBackgroundScale[1] + this.myButtonBackgroundScale[1] + spaceBetweenMessagesAndButtons / 2;
            this.myPointerCollisionExtents = [this.myMessagesBackgroundScale[0], pointerCollisionHalfHeight, this.myCursorTargetCollisionThickness];
        }

        this.myPointerCursorTargetPosition = [0, 0, 0];
        this.myPointerCursorTargetPosition[1] = (this.myMessagesPanelPosition[1] + this.myMessagesBackgroundScale[1]) - this.myPointerCollisionExtents[1];
        this.myPointerCursorTargetPosition[2] = this.myButtonsPanelPosition[2] + this.myButtonTextPosition[2] - 0.0001; // a little behind the button target to avoid hiding it

        //VisibilityButton
        {
            this.myVisibilityButtonBackgroundScale = [0.015, 0.015, 1];
            this.myVisibilityButtonTextPosition = [0, 0, 0.007];
            this.myVisibilityButtonTextScale = [0.18, 0.18, 0.18];

            let distanceBetweenToolsVisibilityButton = 0.01;
            let toolIndex = 0;
            let buttonXOffset = this.myVisibilityButtonBackgroundScale[0] * (2 * toolIndex) + distanceBetweenToolsVisibilityButton * toolIndex;

            this.myVisibilityButtonPosition = [];
            this.myVisibilityButtonPosition[PP.HandednessIndex.NONE] = {};
            this.myVisibilityButtonPosition[PP.HandednessIndex.NONE].myPosition = [-0.202 + buttonXOffset, 0.028, 0.015];

            this.myVisibilityButtonPosition[PP.HandednessIndex.LEFT] = {};
            this.myVisibilityButtonPosition[PP.HandednessIndex.LEFT].myPosition = [-0.202 + buttonXOffset, 0.028, 0.015];

            this.myVisibilityButtonPosition[PP.HandednessIndex.RIGHT] = {};
            this.myVisibilityButtonPosition[PP.HandednessIndex.RIGHT].myPosition = [0.195 - buttonXOffset, 0.028, 0.015];

            this.myVisibilityButtonText = "C";

            this.myVisibilityButtonCursorTargetPosition = [0, 0, 0];
            this.myVisibilityButtonCursorTargetPosition[2] = this.myVisibilityButtonTextPosition[2];
            this.myVisibilityButtonCollisionExtents = this.myVisibilityButtonBackgroundScale;
            this.myVisibilityButtonCollisionExtents[2] = this.myCursorTargetCollisionThickness;
        }
    }

    _initializeRuntimeSetup() {
        this.myPivotObjectGamepadRotation = [];
        this.myPivotObjectGamepadRotation[PP.HandednessIndex.LEFT] = [-0.645, 0.425, 0.25, 0.584];
        this.myPivotObjectGamepadRotation[PP.HandednessIndex.RIGHT] = [-0.645, -0.425, -0.25, 0.584];
        glMatrix.quat.normalize(this.myPivotObjectGamepadRotation[PP.HandednessIndex.LEFT], this.myPivotObjectGamepadRotation[PP.HandednessIndex.LEFT]);
        glMatrix.quat.normalize(this.myPivotObjectGamepadRotation[PP.HandednessIndex.RIGHT], this.myPivotObjectGamepadRotation[PP.HandednessIndex.RIGHT]);

        this.myPivotObjectHandRotation = [];
        this.myPivotObjectHandRotation[PP.HandednessIndex.LEFT] = [-0.084, 0.697, -0.218, 0.678];
        this.myPivotObjectHandRotation[PP.HandednessIndex.RIGHT] = [-0.156, -0.756, 0.236, 0.590];
        glMatrix.quat.normalize(this.myPivotObjectHandRotation[PP.HandednessIndex.LEFT], this.myPivotObjectHandRotation[PP.HandednessIndex.LEFT]);
        glMatrix.quat.normalize(this.myPivotObjectHandRotation[PP.HandednessIndex.RIGHT], this.myPivotObjectHandRotation[PP.HandednessIndex.RIGHT]);

        this.myMainObjectGamepadPosition = [];
        this.myMainObjectGamepadPosition[PP.HandednessIndex.LEFT] = [0.098, 0.228, -0.020];
        this.myMainObjectGamepadPosition[PP.HandednessIndex.RIGHT] = [0.07, 0.228, -0.020];

        this.myMainObjectHandPosition = [];
        this.myMainObjectHandPosition[PP.HandednessIndex.LEFT] = [0.098, 0.228, -0.020];
        this.myMainObjectHandPosition[PP.HandednessIndex.RIGHT] = [0.07, 0.228, -0.020];

        this.myTabString = "    ";
        this.myAssertStartString = "Assertion failed:";

        this.myMaxCharactersPerLine = 100;
        this.myMaxLineSplits = 10; //prevent infinite splitting
        this.myMaxLines = 23;
        this.myMaxMessages = 100;
        this.myMaxMessagesDeletePad = 20; // to prevent deleting at every message, delay the delete after the limit is exceed by this value

        this.myLinesBetweenMessages = 1;

        this.myButtonHoverColor = [150 / 255, 150 / 255, 150 / 255, 1];
        this.myButtonDisabledTextColor = this.myBackgroundColor;
        this.myButtonDisabledBackgroundColor = [110 / 255, 110 / 255, 110 / 255, 1];

        this.myFilterButtonDisabledTextColor = this.myButtonDisabledTextColor;
        this.myFilterButtonDisabledBackgroundColor = this.myButtonDisabledBackgroundColor;

        this.myScrollDelay = 0.1;
        this.myScrollAmount = 1;
        this.myScrollThumbstickHandedness = PP.HandednessIndex.RIGHT;
        this.myScrollThumbstickDelay = 0.1;
        this.myScrollThumbstickMinThreshold = 0.2;
        this.myScrollThumbstickAmount = 3;

        this.myPulseDelay = 5;
        this.myPulseIntensity = 0.3;
        this.myPulseDuration = 0.085;

        this.myClearOriginalConsoleWhenClearPressed = true;
    }
};

PP.ConsoleVRCursorSetup = class ConsoleVRCursorSetup {
    constructor() {
        this.myCursorPosition = [0.01, -0.024, -0.05];
        this.myCursorRotation = [-0.382, 0, 0, 0.924];
        this.myCursorRotation = glMatrix.quat.normalize(this.myCursorRotation, this.myCursorRotation);
        this.myCursorMeshScale = [0.0025, 0.0025, 0.0025];

        this.myCursorColor = [255 / 255, 255 / 255, 255 / 255, 1];

        this.myCursorTargetCollisionGroup = 7; //keep this in sync with ConsoleVRSetup
    }
}