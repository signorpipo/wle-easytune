
PP.EasyTuneNumberWidgetUI = class EasyTuneNumberWidgetUI {

    build(easyTuneComponent, setup) {
        this._createSkeleton(easyTuneComponent);
        this._setTransforms(easyTuneComponent, setup);
        this._addComponents(easyTuneComponent, setup);
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
        this.myVariableLabelPreviousCursorTarget = WL.scene.addObject(this.myVariableLabelPanel);
        this.myVariableLabelNextCursorTarget = WL.scene.addObject(this.myVariableLabelPanel);

        this.myValuePanel = WL.scene.addObject(this.myDisplayPanel);
        this.myValueText = WL.scene.addObject(this.myValuePanel);
        this.myResetValueCursorTarget = WL.scene.addObject(this.myValuePanel);
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
        this.myVariableLabelPreviousCursorTarget.setTranslationLocal(setup.myPreviousCursorTargetPosition);
        this.myVariableLabelNextCursorTarget.setTranslationLocal(setup.myNextCursorTargetPosition);

        this.myValuePanel.setTranslationLocal(setup.myValuePanelPosition);
        this.myValueText.scale(setup.myValueTextScale);
        this.myResetValueCursorTarget.setTranslationLocal(setup.myResetValueCursorTargetPosition);
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
        this.myDisplayBackgroundComponent.mesh = easyTuneComponent._myPlaneMesh;
        this.myDisplayBackgroundComponent.material = easyTuneComponent._myPlaneMaterial.clone();
        this.myDisplayBackgroundComponent.material.color = setup.myBackgroundColor;

        this.myVariableLabelTextComponent = this.myVariableLabelText.addComponent('text');
        this._setupTextComponent(this.myVariableLabelTextComponent, easyTuneComponent, setup);
        this.myVariableLabelTextComponent.text = " ";


        this.myVariableLabelPreviousCursorTargetComponent = this.myVariableLabelPreviousCursorTarget.addComponent('cursor-target');
        this.myVariableLabelPreviousCollisionComponent = this.myVariableLabelPreviousCursorTarget.addComponent('collision');
        this.myVariableLabelPreviousCollisionComponent.collider = setup.myCursorTargetCollisionCollider;
        this.myVariableLabelPreviousCollisionComponent.group = 1 << setup.myCursorTargetCollisionGroup;
        this.myVariableLabelPreviousCollisionComponent.extents = setup.myPreviousCollisionExtents;

        this.myVariableLabelNextCursorTargetComponent = this.myVariableLabelNextCursorTarget.addComponent('cursor-target');
        this.myVariableLabelNextCollisionComponent = this.myVariableLabelNextCursorTarget.addComponent('collision');
        this.myVariableLabelNextCollisionComponent.collider = setup.myCursorTargetCollisionCollider;
        this.myVariableLabelNextCollisionComponent.group = 1 << setup.myCursorTargetCollisionGroup;
        this.myVariableLabelNextCollisionComponent.extents = setup.myNextCollisionExtents;

        this.myValueTextComponent = this.myValueText.addComponent('text');
        this._setupTextComponent(this.myValueTextComponent, easyTuneComponent, setup);
        this.myValueTextComponent.text = " ";

        this.myResetValueCursorTargetComponent = this.myResetValueCursorTarget.addComponent('cursor-target');
        this.myResetValueCollisionComponent = this.myResetValueCursorTarget.addComponent('collision');
        this.myResetValueCollisionComponent.collider = setup.myCursorTargetCollisionCollider;
        this.myResetValueCollisionComponent.group = 1 << setup.myCursorTargetCollisionGroup;
        this.myResetValueCollisionComponent.extents = setup.myResetValueCollisionExtents;
    }

    _addStepComponents(easyTuneComponent, setup) {
        this.myStepBackgroundComponent = this.myStepBackground.addComponent('mesh');
        this.myStepBackgroundComponent.mesh = easyTuneComponent._myPlaneMesh;
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
            stepButtonComponents.myBackground.mesh = easyTuneComponent._myPlaneMesh;
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