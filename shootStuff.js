export const shootTomatoComponent = () => ({
  init() {
    const camera = document.getElementById('camera')
    const splatSnd = document.querySelector('#splat').components.sound
    this.el.sceneEl.addEventListener('touchstart', (event) => {
      // Create element to be thrown, setting position, scale, and model
      const tomato = document.createElement('a-entity')
      tomato.setAttribute('position', camera.object3D.position)
      tomato.setAttribute('scale', '1 1 1')
      tomato.setAttribute('gltf-model', '#tomatoModel')
      // Choose a random rotation offset for some variation
      const randomRotation = { x: -90 + Math.random() * 30, y: Math.random() * 360, z: 0 }
      tomato.setAttribute('rotation', randomRotation)
      // Set velocity, rotated with camera direction
      const velocity = new THREE.Vector3(0, 0, -10)
      velocity.applyQuaternion(camera.object3D.quaternion)
      tomato.setAttribute('velocity', velocity)
      // Add physics body
      tomato.setAttribute('body', {
        type: 'dynamic',
        sphereRadius: 0.35,
        shape: 'sphere',
      })
      tomato.setAttribute('shadow', {
        receive: false,
      })
      // Add tomato to scene
      this.el.sceneEl.appendChild(tomato)
      // The splat is created at the same time as the thrown tomato so
      // there is time to load the model before it hits the ground
      const splatBase = document.createElement('a-entity')
      splatBase.setAttribute('visible', 'false')
      // The splat consists of a model wrapped in an empty
      // parent so we can apply the correct scaling animation
      const splat = document.createElement('a-entity')
      splat.setAttribute('gltf-model', '#tomatoModel')
      splat.setAttribute('scale', '1 1 1')
      splatBase.appendChild(splat)
      this.el.sceneEl.appendChild(splatBase)
      let didCollide = false
      tomato.addEventListener('collide', (e) => {
        // Only want to do the splat once, and with the ground only
        if (didCollide || e.detail.body.el.id !== 'ground') {
          return
        }
        didCollide = true
        // Stop previous splat sound
        splatSnd.stopSound()
        // Play splat sound
        splatSnd.playSound()
        // Copy positioning of thrown tomato to splat
        splatBase.object3D.position.copy(tomato.object3D.position)
        splat.object3D.rotation.copy(tomato.object3D.rotation)
        splatBase.object3D.visible = true
        tomato.setAttribute('visible', 'false')
        // We can't remove the thrown tomato until the physics step is over
        setTimeout(() => {
          tomato.parentNode.removeChild(tomato)
        }, 0)
        // Using animation component to show flattening
        splatBase.setAttribute('animation__scale', {
          property: 'scale',
          from: '1 1 1',
          to: '3 0.1 3',
          dur: 500,
          easing: 'easeOutQuad',
        })
        // After 2.5 seconds, shrink the splat away and delete it
        setTimeout(() => {
          splatBase.setAttribute('animation__scale', {
            property: 'scale',
            from: '3 0.1 3',
            to: '0.001 0.001 0.001',
            dur: 1500,
            easing: 'easeInQuad',
          })
          setTimeout(() => splatBase.parentNode.removeChild(splatBase), 1500)
        }, 2500)
      })
    })
  },
})

// https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg
// // Just load it up on your phone or print it out and point your camera at the image and a little blue-green box should appear!

// a-scene(embedded='', arjs='sourceType: webcam;' physics='debug: false; friction: 0.5; restitution: 2; gravity: -1.5;')
//   a-marker-camera(preset='hiro')

//   a-plane(static-body rotation="-90 0 0" scale="30 3 3" material="opacity: 0.85; color: #2EAFAC;")
//   - var n = 0;
//   - zCoord = 0;
//   while n < 5
//     - var xCoord = (-3 + (n * Math.random(10) * 1.25))
//     - var pos = xCoord +' 0 ' + zCoord
//     //- a-gltf-model(dynamic-body src="https://andrescuervo.github.io/assets/ghostie/ghostie.gltf" scale="0.25 0.25 0.25" position = pos animation__move="property: position; from: " + pos +"; to: " + xCoord + " -1 " + zCoord +"; dur: " + (n * 500) + "; dir: alternate; easing: linear; loop: true;")
//     a-gltf-model(dynamic-body src="https://andrescuervo.github.io/assets/ghostie/ghostie.gltf" scale="0.25 0.25 0.25" position = pos)
//     - n++
// // GLTF model from: https://ten-thousand-models.appspot.com/detail.html?file_id=40746