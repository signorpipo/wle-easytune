PP.ConsoleVRWidgetUI = class ConsoleVRWidgetUI {

    constructor() {
        this._myInputSourceType = PP.InputSourceType.NONE;
    }

    build(parentObject, setup, additionalSetup) {
        this._mySetup = setup;
        this._myAdditionalSetup = additionalSetup;

        this._myPlaneMesh = PP.MeshUtils.createPlaneMesh();

        this._createSkeleton(parentObject);
        this._setTransforms();
        this._addComponents();
    }

    setVisible(isVisible) {
        if (isVisible) {
            this.myMainPanel.resetTransform();
        } else {
            this.myMainPanel.scale([0, 0, 0]);
            this.myMainPanel.setTranslationWorld([0, -3000, 0]);
        }
    }

    setVisibilityButtonVisible(isVisible) {
        if (isVisible) {
            this.myVisibilityButtonPanel.resetTransform();
            this.myVisibilityButtonPanel.setTranslationLocal(this._mySetup.myVisibilityButtonPosition[this._myAdditionalSetup.myHandednessIndex].myPosition);
        } else {
            this.myVisibilityButtonPanel.scale([0, 0, 0]);
            this.myMainPanel.setTranslationWorld([0, -3000, 0]);
        }
    }

    update(dt) {
        if (this._myAdditionalSetup.myHandednessIndex != PP.HandednessIndex.NONE) {
            let useHand = PP.InputUtils.getInputSource(PP.InputSourceType.HAND, this._myAdditionalSetup.myHandedness) != null;

            if (useHand && this._myInputSourceType != PP.InputSourceType.HAND) {
                this._myInputSourceType = PP.InputSourceType.HAND;
                this.myPivotObject.resetRotation();
                this.myPivotObject.rotateObject(this._mySetup.myPivotObjectHandRotation[this._myAdditionalSetup.myHandednessIndex]);
                this.myMainObject.setTranslationLocal(this._mySetup.myMainObjectHandPosition[this._myAdditionalSetup.myHandednessIndex]);
            } else if (!useHand && this._myInputSourceType != PP.InputSourceType.GAMEPAD) {
                this._myInputSourceType = PP.InputSourceType.GAMEPAD;
                this.myPivotObject.resetRotation();
                this.myPivotObject.rotateObject(this._mySetup.myPivotObjectGamepadRotation[this._myAdditionalSetup.myHandednessIndex]);
                this.myMainObject.setTranslationLocal(this._mySetup.myMainObjectGamepadPosition[this._myAdditionalSetup.myHandednessIndex]);
            }
        }
    }

    //Skeleton
    _createSkeleton(parentObject) {
        this.myPivotObject = WL.scene.addObject(parentObject);
        this.myMainObject = WL.scene.addObject(this.myPivotObject);

        this.myMainPanel = WL.scene.addObject(this.myMainObject);

        this._createMessagesSkeleton();
        this._createButtonsSkeleton();
        this._createPointerSkeleton();
        this._createFlagsSkeleton();
    }

    _createMessagesSkeleton() {
        this.myMessagesPanel = WL.scene.addObject(this.myMainPanel);
        this.myMessagesBackground = WL.scene.addObject(this.myMessagesPanel);
        this.myMessagesTextsPanel = WL.scene.addObject(this.myMessagesPanel);

        this.myMessagesTexts = [];
        for (let key in PP.ConsoleVRWidget.MessageType) {
            this.myMessagesTexts[PP.ConsoleVRWidget.MessageType[key]] = WL.scene.addObject(this.myMessagesTextsPanel);
        }
    }

    _createButtonsSkeleton() {
        this.myButtonsPanel = WL.scene.addObject(this.myMainPanel);

        this.myFilterButtonsPanels = [];
        this.myFilterButtonsBackgrounds = [];
        this.myFilterButtonsTexts = [];
        this.myFilterButtonsCursorTargets = [];

        for (let key in PP.ConsoleVRWidget.MessageType) {
            this.myFilterButtonsPanels[PP.ConsoleVRWidget.MessageType[key]] = WL.scene.addObject(this.myButtonsPanel);
            this.myFilterButtonsBackgrounds[PP.ConsoleVRWidget.MessageType[key]] = WL.scene.addObject(this.myFilterButtonsPanels[PP.ConsoleVRWidget.MessageType[key]]);
            this.myFilterButtonsTexts[PP.ConsoleVRWidget.MessageType[key]] = WL.scene.addObject(this.myFilterButtonsPanels[PP.ConsoleVRWidget.MessageType[key]]);
            this.myFilterButtonsCursorTargets[PP.ConsoleVRWidget.MessageType[key]] = WL.scene.addObject(this.myFilterButtonsPanels[PP.ConsoleVRWidget.MessageType[key]]);
        }

        this.myClearButtonPanel = WL.scene.addObject(this.myButtonsPanel);
        this.myClearButtonBackground = WL.scene.addObject(this.myClearButtonPanel);
        this.myClearButtonText = WL.scene.addObject(this.myClearButtonPanel);
        this.myClearButtonCursorTarget = WL.scene.addObject(this.myClearButtonPanel);

        this.myUpButtonPanel = WL.scene.addObject(this.myButtonsPanel);
        this.myUpButtonBackground = WL.scene.addObject(this.myUpButtonPanel);
        this.myUpButtonText = WL.scene.addObject(this.myUpButtonPanel);
        this.myUpButtonCursorTarget = WL.scene.addObject(this.myUpButtonPanel);

        this.myDownButtonPanel = WL.scene.addObject(this.myButtonsPanel);
        this.myDownButtonBackground = WL.scene.addObject(this.myDownButtonPanel);
        this.myDownButtonText = WL.scene.addObject(this.myDownButtonPanel);
        this.myDownButtonCursorTarget = WL.scene.addObject(this.myDownButtonPanel);
    }

    _createPointerSkeleton() {
        this.myPointerCursorTarget = WL.scene.addObject(this.myMainPanel);
    }

    _createFlagsSkeleton() {
        this.myVisibilityButtonPanel = WL.scene.addObject(this.myPivotObject);
        this.myVisibilityButtonBackground = WL.scene.addObject(this.myVisibilityButtonPanel);
        this.myVisibilityButtonText = WL.scene.addObject(this.myVisibilityButtonPanel);
        this.myVisibilityButtonCursorTarget = WL.scene.addObject(this.myVisibilityButtonPanel);
    }

    //Transforms
    _setTransforms() {
        this.myPivotObject.setDirty();

        this._setMessagesTransforms();
        this._setButtonsTransforms();
        this._setPointerTransform();
        this._setFlagsTransform();
    }

    _setMessagesTransforms() {
        this.myMessagesPanel.setTranslationLocal(this._mySetup.myMessagesPanelPosition);
        this.myMessagesBackground.scale(this._mySetup.myMessagesBackgroundScale);

        this.myMessagesTextsPanel.setTranslationLocal(this._mySetup.myMessagesTextsPanelPosition);
        this.myMessagesTextsPanel.scale(this._mySetup.myMessagesTextsPanelScale);
    }

    _setButtonsTransforms() {
        this.myButtonsPanel.setTranslationLocal(this._mySetup.myButtonsPanelPosition);

        //Filter Buttons
        for (let key in PP.ConsoleVRWidget.MessageType) {
            this.myFilterButtonsPanels[PP.ConsoleVRWidget.MessageType[key]].setTranslationLocal(this._mySetup.myFilterButtonsPositions[PP.ConsoleVRWidget.MessageType[key]]);

            this.myFilterButtonsBackgrounds[PP.ConsoleVRWidget.MessageType[key]].scale(this._mySetup.myButtonBackgroundScale);

            this.myFilterButtonsTexts[PP.ConsoleVRWidget.MessageType[key]].setTranslationLocal(this._mySetup.myButtonTextPosition);
            this.myFilterButtonsTexts[PP.ConsoleVRWidget.MessageType[key]].scale(this._mySetup.myButtonTextScale);

            this.myFilterButtonsCursorTargets[PP.ConsoleVRWidget.MessageType[key]].setTranslationLocal(this._mySetup.myButtonCursorTargetPosition);
        }

        //Clear
        {
            this.myClearButtonPanel.setTranslationLocal(this._mySetup.myClearButtonPosition);

            this.myClearButtonBackground.scale(this._mySetup.myButtonBackgroundScale);

            this.myClearButtonText.setTranslationLocal(this._mySetup.myButtonTextPosition);
            this.myClearButtonText.scale(this._mySetup.myButtonTextScale);

            this.myClearButtonCursorTarget.setTranslationLocal(this._mySetup.myButtonCursorTargetPosition);
        }

        //Up
        {
            this.myUpButtonPanel.setTranslationLocal(this._mySetup.myUpButtonPosition);

            this.myUpButtonBackground.scale(this._mySetup.myButtonBackgroundScale);

            this.myUpButtonText.setTranslationLocal(this._mySetup.myButtonTextPosition);
            this.myUpButtonText.scale(this._mySetup.myButtonTextScale);

            this.myUpButtonCursorTarget.setTranslationLocal(this._mySetup.myButtonCursorTargetPosition);
        }

        //Down
        {
            this.myDownButtonPanel.setTranslationLocal(this._mySetup.myDownButtonPosition);

            this.myDownButtonBackground.scale(this._mySetup.myButtonBackgroundScale);

            this.myDownButtonText.setTranslationLocal(this._mySetup.myButtonTextPosition);
            this.myDownButtonText.scale(this._mySetup.myButtonTextScale);

            this.myDownButtonCursorTarget.setTranslationLocal(this._mySetup.myButtonCursorTargetPosition);
        }
    }

    _setPointerTransform() {
        this.myPointerCursorTarget.setTranslationLocal(this._mySetup.myPointerCursorTargetPosition);
    }

    _setFlagsTransform() {
        this.myVisibilityButtonPanel.setTranslationLocal(this._mySetup.myVisibilityButtonPosition[this._myAdditionalSetup.myHandednessIndex].myPosition);

        this.myVisibilityButtonBackground.scale(this._mySetup.myVisibilityButtonBackgroundScale);
        this.myVisibilityButtonText.setTranslationLocal(this._mySetup.myVisibilityButtonTextPosition);
        this.myVisibilityButtonText.scale(this._mySetup.myVisibilityButtonTextScale);
        this.myVisibilityButtonCursorTarget.setTranslationLocal(this._mySetup.myVisibilityButtonCursorTargetPosition);
    }

    //Components
    _addComponents() {
        this._addMessagesComponents();
        this._addButtonsComponents();
        this._addPointerComponents();
        this._addFlagsComponents();
    }

    _addMessagesComponents() {
        let messagesBackgroundMeshComp = this.myMessagesBackground.addComponent('mesh');
        messagesBackgroundMeshComp.mesh = this._myPlaneMesh;
        messagesBackgroundMeshComp.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        messagesBackgroundMeshComp.material.color = this._mySetup.myBackgroundColor;

        this.myMessagesTextComponents = [];
        for (let key in PP.ConsoleVRWidget.MessageType) {
            let textComp = this.myMessagesTexts[PP.ConsoleVRWidget.MessageType[key]].addComponent('text');

            textComp.alignment = this._mySetup.myMessagesTextAlignment;
            textComp.justification = this._mySetup.myMessagesTextJustification;
            textComp.material = this._myAdditionalSetup.myTextMaterial.clone();
            textComp.material.color = this._mySetup.myMessagesTextColors[PP.ConsoleVRWidget.MessageType[key]];
            textComp.material.outlineColor = this._mySetup.myMessagesTextOutlineColors[PP.ConsoleVRWidget.MessageType[key]];
            textComp.material.outlineRange = this._mySetup.myMessagesTextOutlineRange;
            textComp.text = this._mySetup.myMessagesTextStartString;

            this.myMessagesTextComponents[PP.ConsoleVRWidget.MessageType[key]] = textComp;
        }
    }

    _addButtonsComponents() {
        //worship the code copy pasteness

        this.myFilterButtonsBackgroundComponents = [];
        this.myFilterButtonsTextComponents = [];
        this.myFilterButtonsCursorTargetComponents = [];
        this.myFilterButtonsCollisionComponents = [];

        //Filter Buttons
        for (let key in PP.ConsoleVRWidget.MessageType) {
            let buttonBackgroundMeshComp = this.myFilterButtonsBackgrounds[PP.ConsoleVRWidget.MessageType[key]].addComponent('mesh');
            buttonBackgroundMeshComp.mesh = this._myPlaneMesh;
            buttonBackgroundMeshComp.material = this._myAdditionalSetup.myPlaneMaterial.clone();
            buttonBackgroundMeshComp.material.color = this._mySetup.myBackgroundColor;

            let buttonTextComp = this.myFilterButtonsTexts[PP.ConsoleVRWidget.MessageType[key]].addComponent('text');
            this._setupButtonTextComponent(buttonTextComp);
            buttonTextComp.material.color = this._mySetup.myFilterButtonsTextColors[PP.ConsoleVRWidget.MessageType[key]];
            buttonTextComp.material.outlineColor = this._mySetup.myFilterButtonsTextOutlineColors[PP.ConsoleVRWidget.MessageType[key]];
            buttonTextComp.text = this._mySetup.myFilterButtonsTextLabel[PP.ConsoleVRWidget.MessageType[key]];

            let buttonCursorTargetComp = this.myFilterButtonsCursorTargets[PP.ConsoleVRWidget.MessageType[key]].addComponent('cursor-target');

            let buttonCollisionComp = this.myFilterButtonsCursorTargets[PP.ConsoleVRWidget.MessageType[key]].addComponent('collision');
            buttonCollisionComp.collider = this._mySetup.myButtonsCollisionCollider;
            buttonCollisionComp.group = 1 << this._mySetup.myButtonsCollisionGroup;
            buttonCollisionComp.extents = this._mySetup.myButtonsCollisionExtents;

            this.myFilterButtonsBackgroundComponents[PP.ConsoleVRWidget.MessageType[key]] = buttonBackgroundMeshComp;
            this.myFilterButtonsTextComponents[PP.ConsoleVRWidget.MessageType[key]] = buttonTextComp;
            this.myFilterButtonsCursorTargetComponents[PP.ConsoleVRWidget.MessageType[key]] = buttonCursorTargetComp;
            this.myFilterButtonsCollisionComponents[PP.ConsoleVRWidget.MessageType[key]] = buttonCollisionComp;
        }

        //Clear 
        {
            let buttonBackgroundMeshComp = this.myClearButtonBackground.addComponent('mesh');
            buttonBackgroundMeshComp.mesh = this._myPlaneMesh;
            buttonBackgroundMeshComp.material = this._myAdditionalSetup.myPlaneMaterial.clone();
            buttonBackgroundMeshComp.material.color = this._mySetup.myBackgroundColor;

            let buttonTextComp = this.myClearButtonText.addComponent('text');
            this._setupButtonTextComponent(buttonTextComp);
            buttonTextComp.text = this._mySetup.myClearButtonTextLabel;

            let buttonCursorTargetComp = this.myClearButtonCursorTarget.addComponent('cursor-target');

            let buttonCollisionComp = this.myClearButtonCursorTarget.addComponent('collision');
            buttonCollisionComp.collider = this._mySetup.myButtonsCollisionCollider;
            buttonCollisionComp.group = 1 << this._mySetup.myButtonsCollisionGroup;
            buttonCollisionComp.extents = this._mySetup.myButtonsCollisionExtents;

            this.myClearButtonBackgroundComponent = buttonBackgroundMeshComp;
            this.myClearButtonTextComponent = buttonTextComp;
            this.myClearButtonCursorTargetComponent = buttonCursorTargetComp;
            this.myClearButtonCollisionComponent = buttonCollisionComp;
        }

        //Up 
        {
            let buttonBackgroundMeshComp = this.myUpButtonBackground.addComponent('mesh');
            buttonBackgroundMeshComp.mesh = this._myPlaneMesh;
            buttonBackgroundMeshComp.material = this._myAdditionalSetup.myPlaneMaterial.clone();
            buttonBackgroundMeshComp.material.color = this._mySetup.myBackgroundColor;

            let buttonTextComp = this.myUpButtonText.addComponent('text');
            this._setupButtonTextComponent(buttonTextComp);
            buttonTextComp.text = this._mySetup.myUpButtonTextLabel;

            let buttonCursorTargetComp = this.myUpButtonCursorTarget.addComponent('cursor-target');

            let buttonCollisionComp = this.myUpButtonCursorTarget.addComponent('collision');
            buttonCollisionComp.collider = this._mySetup.myButtonsCollisionCollider;
            buttonCollisionComp.group = 1 << this._mySetup.myButtonsCollisionGroup;
            buttonCollisionComp.extents = this._mySetup.myButtonsCollisionExtents;

            this.myUpButtonBackgroundComponent = buttonBackgroundMeshComp;
            this.myUpButtonTextComponent = buttonTextComp;
            this.myUpButtonCursorTargetComponent = buttonCursorTargetComp;
            this.myUpButtonCollisionComponent = buttonCollisionComp;
        }

        //Down 
        {
            let buttonBackgroundMeshComp = this.myDownButtonBackground.addComponent('mesh');
            buttonBackgroundMeshComp.mesh = this._myPlaneMesh;
            buttonBackgroundMeshComp.material = this._myAdditionalSetup.myPlaneMaterial.clone();
            buttonBackgroundMeshComp.material.color = this._mySetup.myBackgroundColor;

            let buttonTextComp = this.myDownButtonText.addComponent('text');
            this._setupButtonTextComponent(buttonTextComp);
            buttonTextComp.text = this._mySetup.myDownButtonTextLabel;

            let buttonCursorTargetComp = this.myDownButtonCursorTarget.addComponent('cursor-target');

            let buttonCollisionComp = this.myDownButtonCursorTarget.addComponent('collision');
            buttonCollisionComp.collider = this._mySetup.myButtonsCollisionCollider;
            buttonCollisionComp.group = 1 << this._mySetup.myButtonsCollisionGroup;
            buttonCollisionComp.extents = this._mySetup.myButtonsCollisionExtents;

            this.myDownButtonBackgroundComponent = buttonBackgroundMeshComp;
            this.myDownButtonTextComponent = buttonTextComp;
            this.myDownButtonCursorTargetComponent = buttonCursorTargetComp;
            this.myDownButtonCollisionComponent = buttonCollisionComp;
        }
    }

    _addPointerComponents() {
        let cursorTargetComp = this.myPointerCursorTarget.addComponent('cursor-target');

        let collisionComp = this.myPointerCursorTarget.addComponent('collision');
        collisionComp.collider = this._mySetup.myPointerCollisionCollider;
        collisionComp.group = 1 << this._mySetup.myPointerCollisionGroup;
        collisionComp.extents = this._mySetup.myPointerCollisionExtents;

        this.myPointerCursorTargetComponent = cursorTargetComp;
        this.myPointerCollisionComponent = collisionComp;
    }

    _addFlagsComponents() {
        this.myVisibilityButtonBackgroundComponent = this.myVisibilityButtonBackground.addComponent('mesh');
        this.myVisibilityButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myVisibilityButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myVisibilityButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myVisibilityButtonTextComponent = this.myVisibilityButtonText.addComponent('text');
        this._setupButtonTextComponent(this.myVisibilityButtonTextComponent);
        this.myVisibilityButtonTextComponent.text = this._mySetup.myVisibilityButtonText;

        this.myVisibilityButtonCursorTargetComponent = this.myVisibilityButtonCursorTarget.addComponent('cursor-target');

        this.myVisibilityButtonCollisionComponent = this.myVisibilityButtonCursorTarget.addComponent('collision');
        this.myVisibilityButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myVisibilityButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myVisibilityButtonCollisionComponent.extents = this._mySetup.myVisibilityButtonCollisionExtents;

    }

    _setupButtonTextComponent(textComponent) {
        textComponent.alignment = this._mySetup.myTextAlignment;
        textComponent.justification = this._mySetup.myTextJustification;
        textComponent.material = this._myAdditionalSetup.myTextMaterial.clone();
        textComponent.material.outlineRange = this._mySetup.myTextOutlineRange;
        textComponent.material.color = this._mySetup.myTextColor;
        textComponent.material.outlineColor = this._mySetup.myTextOutlineColor;
        textComponent.text = "";
    }
};