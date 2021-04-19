WL.registerComponent('finger-cursor', {
    _myHandedness: { type: WL.Type.Enum, values: ['left', 'right'], default: 'left' },
    _myCollisionGroup: { type: WL.Type.Int, default: 1 },
}, {
    init: function () {
        this._myLastTarget = null;
        this._myRefSpace = null;
        this._myHandInputSource = null;
        this._myHandednessString = ['left', 'right'][this._myHandedness];
    },
    start: function () {
        this._myCollision = WL.scene.addObject(this.object.parent);
        this._myCollisionComponent = this._myCollision.addComponent('collision');
        this._myCollisionComponent.collider = 0; //sphere
        this._myCollisionComponent.group = 1 << this._myCollisionGroup;
        this._myCollisionComponent.extents = [0.0125, 0.0125, 0.0125];

        if (WL.xrSession) {
            this._setupVREvents(WL.xrSession);
        } else {
            WL.onXRSessionStart.push(this._setupVREvents.bind(this));
        }
    },
    update: function (dt) {
        this._updateHand();

        if (this._myHandInputSource) {
            let overlaps = this._myCollisionComponent.queryOverlaps();
            let overlapObject = null;
            for (let i = 0; i < overlaps.length; ++i) {
                let object = overlaps[i].object;
                let target = object.getComponent('cursor-target');
                if (target) {
                    overlapObject = target;
                    break;
                }
            }

            if (!overlapObject) {
                if (this._myLastTarget) {
                    this._myLastTarget.onUnhover(this._myLastTarget.object, this);
                    this._myLastTarget = null;
                }
            } else if (!overlapObject.equals(this._myLastTarget)) {
                if (this._myLastTarget) {
                    this._myLastTarget.onUnhover(this._myLastTarget.object, this);
                }

                this._myLastTarget = overlapObject;

                overlapObject.onHover(this._myLastTarget.object, this);
                overlapObject.onClick(this._myLastTarget.object, this);
            }
        } else if (this._myLastTarget) {
            this._myLastTarget.onUnhover(this._myLastTarget.object, this);
            this._myLastTarget = null;
        }
    },
    setActive: function (isActive) {
        if (this.active != isActive && !isActive) {
            this._myCollision.setTranslationLocal([0, -7777, 0]);
        }

        this.active = isActive;
    },
    _updateHand() {
        this._myHandInputSource = PP.InputUtils.getInputSource(this._myHandednessString, PP.InputSourceType.HAND);

        if (this._myHandInputSource) {
            let tip = Module['webxr_frame'].getJointPose(this._myHandInputSource.hand.get("index-finger-tip"), this._myRefSpace);

            if (tip) {
                this._myCollision.resetTransform();
                this._myCollision.transformLocal.set([
                    tip.transform.orientation.x,
                    tip.transform.orientation.y,
                    tip.transform.orientation.z,
                    tip.transform.orientation.w]);
                this._myCollision.translate([
                    tip.transform.position.x,
                    tip.transform.position.y,
                    tip.transform.position.z]);

                /* Last joint radius of each finger is null */
                let r = tip.radius || 0.007;
                this._myCollision.scale([r, r, r]);
            }
        }
    },
    _setupVREvents: function (s) {
        s.requestReferenceSpace('local').then(function (refSpace) { this._myRefSpace = refSpace; }.bind(this));
    },
});