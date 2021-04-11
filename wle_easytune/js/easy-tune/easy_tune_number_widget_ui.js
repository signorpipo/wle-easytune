
PP.EasyTuneNumberWidgetUI = class EasyTuneNumberWidgetUI {

    build(easyTuneComponent, setup) {
        this._myPlaneMesh = PP.MeshUtils.createPlaneMesh();

        this._createSkeleton(easyTuneComponent);
        this._setTransforms(easyTuneComponent, setup);
        this._addComponents(easyTuneComponent, setup);
    }

    setVisible(isVisible) {
        if (isVisible) {
            this.myMainPanel.resetTransform();
        } else {
            this.myMainPanel.scale([0, 0, 0]);
            this.myMainPanel.setTranslationWorld([0, -3000, 0]);
        }
    }

    //Skeleton
    _createSkeleton(easyTuneComponent) {
        this.myMainObject = WL.scene.addObject(easyTuneComponent.object);
        this.myMainPanel = WL.scene.addObject(this.myMainObject);

        this._createDisplaySkeleton();
        this._createStepSkeleton();
        this._createPointerSkeleton();
    }

    _createDisplaySkeleton() {
        this.myDisplayPanel = WL.scene.addObject(this.myMainPanel);
        this.myDisplayBackground = WL.scene.addObject(this.myDisplayPanel);

        this.myVariableLabelPanel = WL.scene.addObject(this.myDisplayPanel);
        this.myVariableLabelText = WL.scene.addObject(this.myVariableLabelPanel);

        this.myValuePanel = WL.scene.addObject(this.myDisplayPanel);
        this.myValueText = WL.scene.addObject(this.myValuePanel);
        this.myResetValueCursorTarget = WL.scene.addObject(this.myValuePanel);

        //Next/Previous
        this.myNextButtonPanel = WL.scene.addObject(this.myVariableLabelPanel);
        this.myNextButtonBackground = WL.scene.addObject(this.myNextButtonPanel);
        this.myNextButtonText = WL.scene.addObject(this.myNextButtonPanel);
        this.myNextButtonCursorTarget = WL.scene.addObject(this.myNextButtonPanel);

        this.myPreviousButtonPanel = WL.scene.addObject(this.myVariableLabelPanel);
        this.myPreviousButtonBackground = WL.scene.addObject(this.myPreviousButtonPanel);
        this.myPreviousButtonText = WL.scene.addObject(this.myPreviousButtonPanel);
        this.myPreviousButtonCursorTarget = WL.scene.addObject(this.myPreviousButtonPanel);

        //Increase/Decrease
        this.myIncreaseButtonPanel = WL.scene.addObject(this.myValuePanel);
        this.myIncreaseButtonBackground = WL.scene.addObject(this.myIncreaseButtonPanel);
        this.myIncreaseButtonText = WL.scene.addObject(this.myIncreaseButtonPanel);
        this.myIncreaseButtonCursorTarget = WL.scene.addObject(this.myIncreaseButtonPanel);

        this.myDecreaseButtonPanel = WL.scene.addObject(this.myValuePanel);
        this.myDecreaseButtonBackground = WL.scene.addObject(this.myDecreaseButtonPanel);
        this.myDecreaseButtonText = WL.scene.addObject(this.myDecreaseButtonPanel);
        this.myDecreaseButtonCursorTarget = WL.scene.addObject(this.myDecreaseButtonPanel);
    }

    _createStepSkeleton() {
        this.myStepPanel = WL.scene.addObject(this.myMainPanel);
        this.myStepBackground = WL.scene.addObject(this.myStepPanel);

        this.myStepLabelPanel = WL.scene.addObject(this.myStepPanel);
        this.myStepLabelText = WL.scene.addObject(this.myStepLabelPanel);
        this.myResetStepCursorTarget = WL.scene.addObject(this.myStepLabelPanel);

        this.myStepButtonsPanel = WL.scene.addObject(this.myStepPanel);

        this.myStepButtons = [];
        for (let i = 0; i < 4; ++i) {
            let stepButton = {};

            stepButton.myPanel = WL.scene.addObject(this.myStepButtonsPanel);
            stepButton.myBackground = WL.scene.addObject(stepButton.myPanel);
            stepButton.myText = WL.scene.addObject(stepButton.myPanel);
            stepButton.myCursorTarget = WL.scene.addObject(stepButton.myPanel);

            this.myStepButtons[i] = stepButton;
        }
    }

    _createPointerSkeleton() {
        this.myPointerCursorTarget = WL.scene.addObject(this.myMainPanel);
    }

    //Transforms
    _setTransforms(easyTuneComponent, setup) {
        this.myMainObject.setTranslationLocal(setup.myMainObjectTransforms[easyTuneComponent._myHandedness].myPosition);
        this.myMainObject.rotateObject(setup.myMainObjectTransforms[easyTuneComponent._myHandedness].myRotation);

        this._setDisplayTransforms(easyTuneComponent, setup);
        this._setStepTransforms(easyTuneComponent, setup);
        this._setPointerTransform(easyTuneComponent, setup);
    }

    _setDisplayTransforms(easyTuneComponent, setup) {
        this.myDisplayPanel.setTranslationLocal(setup.myDisplayPanelPosition);
        this.myDisplayBackground.scale(setup.myDisplayBackgroundScale);

        this.myVariableLabelPanel.setTranslationLocal(setup.myVariableLabelPanelPosition);
        this.myVariableLabelText.scale(setup.myVariableLabelTextScale);

        this.myValuePanel.setTranslationLocal(setup.myValuePanelPosition);
        this.myValueText.scale(setup.myValueTextScale);
        this.myResetValueCursorTarget.setTranslationLocal(setup.myResetValueCursorTargetPosition);

        //Next/Previous
        this.myNextButtonPanel.setTranslationLocal(setup.myNextButtonPosition);
        this.myNextButtonBackground.scale(setup.myDisplayButtonBackgroundScale);
        this.myNextButtonText.setTranslationLocal(setup.myDisplayButtonTextPosition);
        this.myNextButtonText.scale(setup.myDisplayButtonTextScale);
        this.myNextButtonCursorTarget.setTranslationLocal(setup.myDisplayButtonCursorTargetPosition);

        this.myPreviousButtonPanel.setTranslationLocal(setup.myPreviousButtonPosition);
        this.myPreviousButtonBackground.scale(setup.myDisplayButtonBackgroundScale);
        this.myPreviousButtonText.setTranslationLocal(setup.myDisplayButtonTextPosition);
        this.myPreviousButtonText.scale(setup.myDisplayButtonTextScale);
        this.myPreviousButtonCursorTarget.setTranslationLocal(setup.myDisplayButtonCursorTargetPosition);

        //Increase/Decrease
        this.myIncreaseButtonPanel.setTranslationLocal(setup.myIncreaseButtonPosition);
        this.myIncreaseButtonBackground.scale(setup.myDisplayButtonBackgroundScale);
        this.myIncreaseButtonText.setTranslationLocal(setup.myDisplayButtonTextPosition);
        this.myIncreaseButtonText.scale(setup.myDisplayButtonTextScale);
        this.myIncreaseButtonCursorTarget.setTranslationLocal(setup.myDisplayButtonCursorTargetPosition);

        this.myDecreaseButtonPanel.setTranslationLocal(setup.myDecreaseButtonPosition);
        this.myDecreaseButtonBackground.scale(setup.myDisplayButtonBackgroundScale);
        this.myDecreaseButtonText.setTranslationLocal(setup.myDisplayButtonTextPosition);
        this.myDecreaseButtonText.scale(setup.myDisplayButtonTextScale);
        this.myDecreaseButtonCursorTarget.setTranslationLocal(setup.myDisplayButtonCursorTargetPosition);
    }

    _setStepTransforms(easyTuneComponent, setup) {
        this.myStepPanel.setTranslationLocal(setup.myStepPanelPosition);
        this.myStepBackground.scale(setup.myStepBackgroundScale);

        this.myStepLabelPanel.setTranslationLocal(setup.myStepLabelPanelPosition);
        this.myStepLabelText.scale(setup.myStepLabelTextScale);
        this.myResetStepCursorTarget.setTranslationLocal(setup.myResetStepCursorTargetPosition);

        this.myStepButtonsPanel.setTranslationLocal(setup.myStepButtonsPanelPosition);

        for (let i = 0; i < this.myStepButtons.length; ++i) {
            let stepButton = this.myStepButtons[i];

            stepButton.myPanel.setTranslationLocal(setup.myStepButtonsSetupList[i].myPosition);
            stepButton.myBackground.scale(setup.myStepButtonBackgroundScale);
            stepButton.myText.setTranslationLocal(setup.myStepButtonTextPosition);
            stepButton.myText.scale(setup.myStepButtonTextScale);
            stepButton.myCursorTarget.setTranslationLocal(setup.myStepButtonCursorTargetPosition);
        }
    }

    _setPointerTransform(easyTuneComponent, setup) {
        this.myPointerCursorTarget.setTranslationLocal(setup.myPointerCursorTargetPosition);
    }

    //Components
    _addComponents(easyTuneComponent, setup) {
        this._addDisplayComponents(easyTuneComponent, setup);
        this._addStepComponents(easyTuneComponent, setup);
        this._addPointerComponents(easyTuneComponent, setup);
    }

    _addDisplayComponents(easyTuneComponent, setup) {
        this.myDisplayBackgroundComponent = this.myDisplayBackground.addComponent('mesh');
        this.myDisplayBackgroundComponent.mesh = this._myPlaneMesh;
        this.myDisplayBackgroundComponent.material = easyTuneComponent._myPlaneMaterial.clone();
        this.myDisplayBackgroundComponent.material.color = setup.myDisplayBackgroundColor;

        this.myVariableLabelTextComponent = this.myVariableLabelText.addComponent('text');
        this._setupTextComponent(this.myVariableLabelTextComponent, easyTuneComponent, setup);
        this.myVariableLabelTextComponent.text = " ";

        this.myValueTextComponent = this.myValueText.addComponent('text');
        this._setupTextComponent(this.myValueTextComponent, easyTuneComponent, setup);
        this.myValueTextComponent.text = " ";

        this.myResetValueCursorTargetComponent = this.myResetValueCursorTarget.addComponent('cursor-target');
        this.myResetValueCollisionComponent = this.myResetValueCursorTarget.addComponent('collision');
        this.myResetValueCollisionComponent.collider = setup.myCursorTargetCollisionCollider;
        this.myResetValueCollisionComponent.group = 1 << setup.myCursorTargetCollisionGroup;
        this.myResetValueCollisionComponent.extents = setup.myResetValueCollisionExtents;

        //Next/Previous
        this.myNextButtonBackgroundComponent = this.myNextButtonBackground.addComponent('mesh');
        this.myNextButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myNextButtonBackgroundComponent.material = easyTuneComponent._myPlaneMaterial.clone();
        this.myNextButtonBackgroundComponent.material.color = setup.myBackgroundColor;

        this.myNextButtonTextComponent = this.myNextButtonText.addComponent('text');
        this._setupTextComponent(this.myNextButtonTextComponent, easyTuneComponent, setup);
        this.myNextButtonTextComponent.text = setup.myNextButtonText;

        this.myNextButtonCursorTargetComponent = this.myNextButtonCursorTarget.addComponent('cursor-target');
        this.myNextButtonCollisionComponent = this.myNextButtonCursorTarget.addComponent('collision');
        this.myNextButtonCollisionComponent.collider = setup.myCursorTargetCollisionCollider;
        this.myNextButtonCollisionComponent.group = 1 << setup.myCursorTargetCollisionGroup;
        this.myNextButtonCollisionComponent.extents = setup.myDisplayButtonCollisionExtents;

        this.myPreviousButtonBackgroundComponent = this.myPreviousButtonBackground.addComponent('mesh');
        this.myPreviousButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myPreviousButtonBackgroundComponent.material = easyTuneComponent._myPlaneMaterial.clone();
        this.myPreviousButtonBackgroundComponent.material.color = setup.myBackgroundColor;

        this.myPreviousButtonTextComponent = this.myPreviousButtonText.addComponent('text');
        this._setupTextComponent(this.myPreviousButtonTextComponent, easyTuneComponent, setup);
        this.myPreviousButtonTextComponent.text = setup.myPreviousButtonText;

        this.myPreviousButtonCursorTargetComponent = this.myPreviousButtonCursorTarget.addComponent('cursor-target');
        this.myPreviousButtonCollisionComponent = this.myPreviousButtonCursorTarget.addComponent('collision');
        this.myPreviousButtonCollisionComponent.collider = setup.myCursorTargetCollisionCollider;
        this.myPreviousButtonCollisionComponent.group = 1 << setup.myCursorTargetCollisionGroup;
        this.myPreviousButtonCollisionComponent.extents = setup.myDisplayButtonCollisionExtents;

        //Increase/Decrease
        this.myIncreaseButtonBackgroundComponent = this.myIncreaseButtonBackground.addComponent('mesh');
        this.myIncreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myIncreaseButtonBackgroundComponent.material = easyTuneComponent._myPlaneMaterial.clone();
        this.myIncreaseButtonBackgroundComponent.material.color = setup.myBackgroundColor;

        this.myIncreaseButtonTextComponent = this.myIncreaseButtonText.addComponent('text');
        this._setupTextComponent(this.myIncreaseButtonTextComponent, easyTuneComponent, setup);
        this.myIncreaseButtonTextComponent.text = setup.myIncreaseButtonText;

        this.myIncreaseButtonCursorTargetComponent = this.myIncreaseButtonCursorTarget.addComponent('cursor-target');
        this.myIncreaseButtonCollisionComponent = this.myIncreaseButtonCursorTarget.addComponent('collision');
        this.myIncreaseButtonCollisionComponent.collider = setup.myCursorTargetCollisionCollider;
        this.myIncreaseButtonCollisionComponent.group = 1 << setup.myCursorTargetCollisionGroup;
        this.myIncreaseButtonCollisionComponent.extents = setup.myDisplayButtonCollisionExtents;

        this.myDecreaseButtonBackgroundComponent = this.myDecreaseButtonBackground.addComponent('mesh');
        this.myDecreaseButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myDecreaseButtonBackgroundComponent.material = easyTuneComponent._myPlaneMaterial.clone();
        this.myDecreaseButtonBackgroundComponent.material.color = setup.myBackgroundColor;

        this.myDecreaseButtonTextComponent = this.myDecreaseButtonText.addComponent('text');
        this._setupTextComponent(this.myDecreaseButtonTextComponent, easyTuneComponent, setup);
        this.myDecreaseButtonTextComponent.text = setup.myDecreaseButtonText;

        this.myDecreaseButtonCursorTargetComponent = this.myDecreaseButtonCursorTarget.addComponent('cursor-target');
        this.myDecreaseButtonCollisionComponent = this.myDecreaseButtonCursorTarget.addComponent('collision');
        this.myDecreaseButtonCollisionComponent.collider = setup.myCursorTargetCollisionCollider;
        this.myDecreaseButtonCollisionComponent.group = 1 << setup.myCursorTargetCollisionGroup;
        this.myDecreaseButtonCollisionComponent.extents = setup.myDisplayButtonCollisionExtents;
    }

    _addStepComponents(easyTuneComponent, setup) {
        this.myStepBackgroundComponent = this.myStepBackground.addComponent('mesh');
        this.myStepBackgroundComponent.mesh = this._myPlaneMesh;
        this.myStepBackgroundComponent.material = easyTuneComponent._myPlaneMaterial.clone();
        this.myStepBackgroundComponent.material.color = setup.myStepBackgroundColor;

        this.myStepLabelTextComponent = this.myStepLabelText.addComponent('text');
        this._setupTextComponent(this.myStepLabelTextComponent, easyTuneComponent, setup);
        this.myStepLabelTextComponent.text = " ";

        this.myResetStepCursorTargetComponent = this.myResetStepCursorTarget.addComponent('cursor-target');
        this.myResetStepCollisionComponent = this.myResetStepCursorTarget.addComponent('collision');
        this.myResetStepCollisionComponent.collider = setup.myCursorTargetCollisionCollider;
        this.myResetStepCollisionComponent.group = 1 << setup.myCursorTargetCollisionGroup;
        this.myResetStepCollisionComponent.extents = setup.myResetStepCollisionExtents;

        this.myStepButtonsComponents = [];

        for (let i = 0; i < this.myStepButtons.length; ++i) {
            let stepButton = this.myStepButtons[i];
            let stepButtonComponents = {};

            stepButtonComponents.myBackground = stepButton.myBackground.addComponent('mesh');
            stepButtonComponents.myBackground.mesh = this._myPlaneMesh;
            stepButtonComponents.myBackground.material = easyTuneComponent._myPlaneMaterial.clone();
            stepButtonComponents.myBackground.material.color = setup.myBackgroundColor;

            stepButtonComponents.myText = stepButton.myText.addComponent('text');
            this._setupTextComponent(stepButtonComponents.myText, easyTuneComponent, setup);
            stepButtonComponents.myText.text = " ";
            stepButtonComponents.myText.text = setup.myStepButtonStartString.concat(setup.myStepButtonsSetupList[i].myStepMultiplier);

            stepButtonComponents.myCursorTarget = stepButton.myCursorTarget.addComponent('cursor-target');
            stepButtonComponents.myCollision = stepButton.myCursorTarget.addComponent('collision');
            stepButtonComponents.myCollision.collider = setup.myCursorTargetCollisionCollider;
            stepButtonComponents.myCollision.group = 1 << setup.myCursorTargetCollisionGroup;
            stepButtonComponents.myCollision.extents = setup.myStepButtonCollisionExtents;

            this.myStepButtonsComponents[i] = stepButtonComponents;
        }
    }

    _addPointerComponents(easyTuneComponent, setup) {
        this.myPointerCursorTargetComponent = this.myPointerCursorTarget.addComponent('cursor-target');

        this.myPointerCollisionComponent = this.myPointerCursorTarget.addComponent('collision');
        this.myPointerCollisionComponent.collider = setup.myCursorTargetCollisionCollider;
        this.myPointerCollisionComponent.group = 1 << setup.myCursorTargetCollisionGroup;
        this.myPointerCollisionComponent.extents = setup.myPointerCollisionExtents;
    }

    _setupTextComponent(textComponent, easyTuneComponent, setup) {
        textComponent.alignment = setup.myTextAlignment;
        textComponent.justification = setup.myTextJustification;
        textComponent.material = easyTuneComponent._myTextMaterial.clone();
        textComponent.material.outlineRange = setup.myTextOutlineRange;
        textComponent.material.color = setup.myTextColor;
        textComponent.material.outlineColor = setup.myTextOutlineColor;
    }
};