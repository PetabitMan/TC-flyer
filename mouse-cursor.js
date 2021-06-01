AFRAME.registerComponent('mouse-cursor', {
    schema: {
        enabled: { default: true },
        positionFactorY: { default: -5 },
        positionFactorX: { default: 5 }
    },

    init: function () {

        this.handlePosition = this.handlePosition.bind(this);

        this.isVisible = false;



        this.el.sceneEl.addEventListener("markerFound", e => {
            this.isVisible = true;
        });

        this.el.sceneEl.addEventListener("markerLost", e => {
            this.isVisible = false;
        });
    },
    update: function () {
        if (this.data.enabled) {

            this.el.sceneEl.addEventListener(
                "onefingermove",
                this.handlePosition
            );

        } else {

            this.el.sceneEl.removeEventListener(
                "onefingermove",
                this.handlePosition
            );

        }
    },

    remove: function () {

        this.el.sceneEl.removeEventListener(
            "onefingermove",
            this.handlePosition
        );

    },
    handlePosition: function (event) {
        if (this.isVisible) {
            this.el.object3D.position.y +=
                event.detail.positionChange.y * this.data.positionFactorY;
            this.el.object3D.position.x +=
                event.detail.positionChange.x * this.data.positionFactorX;
        }
    },


});