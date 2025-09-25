import './style.css'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xFFC700)

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.z = 5
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Lys
const directionalLight = new THREE.DirectionalLight(0xff0000, 1)
directionalLight.position.set(2, 1, 2)
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0x781111, 0.5)
scene.add(ambientLight)

// Baggrund
const imgLoad = new THREE.TextureLoader()
imgLoad.load('/Billeder/intens.jpg', texture => {
  scene.background = texture
})

// Tekst
let textMesh // global variabel til animation
const fontLoader = new FontLoader()
fontLoader.load('/Fonts/Maguntiak.json', font => {
  const textGeo = new TextGeometry('Intens', {
    font: font,
    size: 1,
    height: 0.5,
    shininess: 1000,
    curveSegments: 12,
  })

 textGeo.center() // centrer geometrien, rotation fra midten

  const textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 })
  textMesh = new THREE.Mesh(textGeo, textMaterial)
  scene.add(textMesh)
})


// Animation
let shakeTime = 0
function animate() {
  requestAnimationFrame(animate)
  if (textMesh) {
    // Roter stadig lidt på X for at bevare bevægelse
    textMesh.rotation.x += 0

    // Voldsom rysten fra højre til venstre
    shakeTime += 3 // hastigheden på rysten
    textMesh.position.x = Math.sin(shakeTime) * 0.5 // amplitude (0.5 = voldsom)
  }
  renderer.render(scene, camera)
}
animate()

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
