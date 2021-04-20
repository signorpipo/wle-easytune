WL.registerComponent('tool-cursor', {
    _myHandedness: { type: WL.Type.Enum, values: ['left', 'right'], default: 'left' },
    _myCursorMesh: { type: WL.Type.Mesh, default: null },
    _myCursorMaterial: { type: WL.Type.Material, default: null }
}, {
    init: function () {
        this._myHandednessString = ['left', 'right'][this._myHandedness];

        this._myCursorPosition = [0.01, -0.024, -0.05];
        this._myCursorRotation = [-0.382, 0, 0, 0.924];
        this._myCursorRotation = glMatrix.quat.normalize(this._myCursorRotation, this._myCursorRotation);
        this._myCursorMeshScale = [0.0025, 0.0025, 0.0025];

        this._myCursorColor = [255 / 255, 255 / 255, 255 / 255, 1];

        this._myCursorTargetCollisionGroup = 7;
    },
    start: function () {
        this._myCursorObject = WL.scene.addObject(this.object);
        this._myCursorObject.setTranslationLocal(this._myCursorPosition);
        this._myCursorObject.rotateObject(this._myCursorRotation);

        this._myCursorMeshObject = WL.scene.addObject(this._myCursorObject);
        this._myCursorMeshObject.scale(this._myCursorMeshScale);

        this._myCursorMeshComponent = this._myCursorMeshObject.addComponent("mesh");
        this._myCursorMeshComponent.mesh = this._myCursorMesh;
        this._myCursorMeshComponent.material = this._myCursorMaterial.clone();
        this._myCursorMeshComponent.material.color = this._myCursorColor;

        this._myCursorComponent = this._myCursorObject.addComponent("cursor", { "collisionGroup": this._myCursorTargetCollisionGroup, "handedness": this._myHandedness + 1 });
        this._myCursorComponent.cursorObject = this._myCursorMeshObject;
        this._myCursorComponent.rayCastMode = 0; //collision

        this._myFingerCursorComponent = this.object.addComponent("finger-cursor", {
            "_myCollisionGroup": this._myCursorTargetCollisionGroup,
            "_myHandedness": this._myHandedness,
            "_myCursorMesh": this._myCursorMesh,
            "_myCursorMaterial": this._myCursorMeshComponent.material
        });
        this._myFingerCursorComponent.setActive(false);
    },
    update: function (dt) {
        let isUsingHand = this._isUsingHand();
        this._myCursorComponent.active = !isUsingHand;
        this._myFingerCursorComponent.setActive(isUsingHand);
    },
    _isUsingHand: function () {
        let isUsingHand = false;

        if (WL.xrSession) {
            for (let i = 0; i < WL.xrSession.inputSources.length; i++) {
                let input = WL.xrSession.inputSources[i];
                if (input.hand && input.handedness == this._myHandednessString) {
                    isUsingHand = true;
                    break;
                }
            }
        }

        return isUsingHand;
    }
});