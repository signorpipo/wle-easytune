WL.registerComponent('tool-cursor', {
    _myHandedness: { type: WL.Type.Enum, values: ['left', 'right'], default: 'left' },
    _myCursorMesh: { type: WL.Type.Mesh, default: null },
    _myCursorMaterial: { type: WL.Type.Material, default: null }
}, {
    init: function () {
        this._myCursorPosition = [0.01, -0.024, -0.05];
        this._myCursorRotation = [-0.382, 0, 0, 0.924];
        this._myCursorRotation = glMatrix.quat.normalize(this._myCursorRotation, this._myCursorRotation);
        this._myCursorMeshScale = [0.0025, 0.0025, 0.0025];

        this._myCursorColor = [255 / 255, 255 / 255, 255 / 255, 1];

        this._myCursorTargetCollisionGroup = 7;
    },
    start: function () {
        this._myToolCursorObject = WL.scene.addObject(this.object);
        this._myToolCursorObject.setTranslationLocal(this._myCursorPosition);
        this._myToolCursorObject.rotateObject(this._myCursorRotation);

        this._myCursorMeshObject = WL.scene.addObject(this._myToolCursorObject);
        this._myCursorMeshObject.scale(this._myCursorMeshScale);

        this._myCursorMeshComponent = this._myCursorMeshObject.addComponent("mesh");
        this._myCursorMeshComponent.mesh = this._myCursorMesh;
        this._myCursorMeshComponent.material = this._myCursorMaterial.clone();
        this._myCursorMeshComponent.material.color = this._myCursorColor;

        this._myCursorComponent = this._myToolCursorObject.addComponent("cursor", { "collisionGroup": this._myCursorTargetCollisionGroup, "handedness": this._myHandedness + 1 });
        this._myCursorComponent.cursorObject = this._myCursorMeshObject;
        this._myCursorComponent.rayCastMode = 0; //collision
    }
});