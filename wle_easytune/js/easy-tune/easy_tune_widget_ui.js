
PP.EasyTuneWidgetUI = class EasyTuneWidgetUI {

    build(parentComponent, setup) {
        this._myPlaneMesh = PP.MeshUtils.createPlaneMesh();

        this._createSkeleton(parentComponent);
        this._setTransforms(parentComponent, setup);
        this._addComponents(parentComponent, setup);
    }

    setVisible(isVisible) {
        if (isVisible) {
            this.myMainPanel.resetTransform();
        } else {
            this.myMainPanel.scale([0, 0, 0]);
            this.myMainPanel.setTranslationWorld([0, -3000, 0]);
        }
    }

    update(dt) {
        //this.myVisibilityButtonPanel.setTranslationLocal([PP.EasyTuneVariables.get("Visibility X").myValue, PP.EasyTuneVariables.get("Visibility Y").myValue, PP.EasyTuneVariables.get("Visibility Z").myValue]);
    }

    //Skeleton
    _createSkeleton(parentComponent) {
        this.myMainObject = WL.scene.addObject(parentComponent.object);
        this.myMainPanel = WL.scene.addObject(this.myMainObject);

        this.myVisibilityButtonPanel = WL.scene.addObject(this.myMainPanel);
        this.myVisibilityButtonBackground = WL.scene.addObject(this.myVisibilityButtonPanel);
        this.myVisibilityButtonText = WL.scene.addObject(this.myVisibilityButtonPanel);
        this.myVisibilityButtonCursorTarget = WL.scene.addObject(this.myVisibilityButtonPanel);
    }

    //Transforms
    _setTransforms(parentComponent, setup) {
        this.myMainObject.setTranslationLocal(setup.myMainObjectTransforms[parentComponent._myHandedness].myPosition);
        this.myMainObject.rotateObject(setup.myMainObjectTransforms[parentComponent._myHandedness].myRotation);

        this.myVisibilityButtonPanel.setTranslationLocal(setup.myVisibilityButtonPosition);
        this.myVisibilityButtonBackground.scale(setup.myVisibilityButtonBackgroundScale);
        this.myVisibilityButtonText.setTranslationLocal(setup.myVisibilityButtonTextPosition);
        this.myVisibilityButtonText.scale(setup.myVisibilityButtonTextScale);
        this.myVisibilityButtonCursorTarget.setTranslationLocal(setup.myVisibilityButtonCursorTargetPosition);
    }

    //Components
    _addComponents(parentComponent, setup) {
        this.myVisibilityButtonBackgroundComponent = this.myVisibilityButtonBackground.addComponent('mesh');
        this.myVisibilityButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myVisibilityButtonBackgroundComponent.material = parentComponent._myPlaneMaterial.clone();
        this.myVisibilityButtonBackgroundComponent.material.color = setup.myBackgroundColor;

        this.myVisibilityButtonTextComponent = this.myVisibilityButtonText.addComponent('text');
        this._setupTextComponent(this.myVisibilityButtonTextComponent, parentComponent, setup);
        this.myVisibilityButtonTextComponent.text = setup.myVisibilityButtonText;

        this.myVisibilityButtonCursorTargetComponent = this.myVisibilityButtonCursorTarget.addComponent('cursor-target');
        this.myVisibilityButtonCollisionComponent = this.myVisibilityButtonCursorTarget.addComponent('collision');
        this.myVisibilityButtonCollisionComponent.collider = setup.myCursorTargetCollisionCollider;
        this.myVisibilityButtonCollisionComponent.group = 1 << setup.myCursorTargetCollisionGroup;
        this.myVisibilityButtonCollisionComponent.extents = setup.myVisibilityButtonCollisionExtents;
    }

    _setupTextComponent(textComponent, parentComponent, setup) {
        textComponent.alignment = setup.myTextAlignment;
        textComponent.justification = setup.myTextJustification;
        textComponent.material = parentComponent._myTextMaterial.clone();
        textComponent.material.outlineRange = setup.myTextOutlineRange;
        textComponent.material.color = setup.myTextColor;
        textComponent.material.outlineColor = setup.myTextOutlineColor;
    }
};