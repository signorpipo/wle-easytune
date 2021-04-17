
PP.EasyTuneWidgetUI = class EasyTuneWidgetUI {

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
            this.myVisibilityButtonPanel.setTranslationLocal(this._mySetup.myVisibilityButtonPosition[this._myAdditionalSetup.myHandedness].myPosition);
        } else {
            this.myVisibilityButtonPanel.scale([0, 0, 0]);
            this.myMainPanel.setTranslationWorld([0, -3000, 0]);
        }
    }

    update(dt) {
        if (this._myAdditionalSetup.myHandedness != PP.ConsoleVRWidget.Handedness.NONE) {
            let useHand = false;
            if (WL.xrSession) {
                for (let input of WL.xrSession.inputSources) {
                    if (input.hand && ((input.handedness == "right" && this._myAdditionalSetup.myHandedness != PP.ConsoleVRWidget.Handedness.RIGHT) ||
                        input.handedness == "left" && this._myAdditionalSetup.myHandedness != PP.ConsoleVRWidget.Handedness.LEFT)) {
                        useHand = true;
                    }
                }
            }

            if (useHand && this._myInputSourceType != PP.InputSourceType.HAND) {
                this._myInputSourceType = PP.InputSourceType.HAND;
                this.myPivotObject.resetRotation();
                this.myPivotObject.rotateObject(this._mySetup.myPivotObjectHandRotation[this._myAdditionalSetup.myHandedness]);
            } else if (!useHand && this._myInputSourceType != PP.InputSourceType.GAMEPAD) {
                this._myInputSourceType = PP.InputSourceType.GAMEPAD;
                this.myPivotObject.resetRotation();
                this.myPivotObject.rotateObject(this._mySetup.myPivotObjectGamepadRotation[this._myAdditionalSetup.myHandedness]);
            }
        }
    }

    //Skeleton
    _createSkeleton(parentObject) {
        this.myPivotObject = WL.scene.addObject(parentObject);

        this.myMainPanel = WL.scene.addObject(this.myMainObject);

        this.myVisibilityButtonPanel = WL.scene.addObject(this.myPivotObject);
        this.myVisibilityButtonBackground = WL.scene.addObject(this.myVisibilityButtonPanel);
        this.myVisibilityButtonText = WL.scene.addObject(this.myVisibilityButtonPanel);
        this.myVisibilityButtonCursorTarget = WL.scene.addObject(this.myVisibilityButtonPanel);
    }

    //Transforms
    _setTransforms() {
        this.myPivotObject.setDirty();

        this.myVisibilityButtonPanel.setTranslationLocal(this._mySetup.myVisibilityButtonPosition[this._myAdditionalSetup.myHandedness].myPosition);
        this.myVisibilityButtonBackground.scale(this._mySetup.myVisibilityButtonBackgroundScale);
        this.myVisibilityButtonText.setTranslationLocal(this._mySetup.myVisibilityButtonTextPosition);
        this.myVisibilityButtonText.scale(this._mySetup.myVisibilityButtonTextScale);
        this.myVisibilityButtonCursorTarget.setTranslationLocal(this._mySetup.myVisibilityButtonCursorTargetPosition);
    }

    //Components
    _addComponents() {
        this.myVisibilityButtonBackgroundComponent = this.myVisibilityButtonBackground.addComponent('mesh');
        this.myVisibilityButtonBackgroundComponent.mesh = this._myPlaneMesh;
        this.myVisibilityButtonBackgroundComponent.material = this._myAdditionalSetup.myPlaneMaterial.clone();
        this.myVisibilityButtonBackgroundComponent.material.color = this._mySetup.myBackgroundColor;

        this.myVisibilityButtonTextComponent = this.myVisibilityButtonText.addComponent('text');
        this.setupTextComponent(this.myVisibilityButtonTextComponent);
        this.myVisibilityButtonTextComponent.text = this._mySetup.myVisibilityButtonText;

        this.myVisibilityButtonCursorTargetComponent = this.myVisibilityButtonCursorTarget.addComponent('cursor-target');
        this.myVisibilityButtonCollisionComponent = this.myVisibilityButtonCursorTarget.addComponent('collision');
        this.myVisibilityButtonCollisionComponent.collider = this._mySetup.myCursorTargetCollisionCollider;
        this.myVisibilityButtonCollisionComponent.group = 1 << this._mySetup.myCursorTargetCollisionGroup;
        this.myVisibilityButtonCollisionComponent.extents = this._mySetup.myVisibilityButtonCollisionExtents;
    }

    setupTextComponent(textComponent) {
        textComponent.alignment = this._mySetup.myTextAlignment;
        textComponent.justification = this._mySetup.myTextJustification;
        textComponent.material = this._myAdditionalSetup.myTextMaterial.clone();
        textComponent.material.outlineRange = this._mySetup.myTextOutlineRange;
        textComponent.material.color = this._mySetup.myTextColor;
        textComponent.material.outlineColor = this._mySetup.myTextOutlineColor;
        textComponent.text = "";
    }
};