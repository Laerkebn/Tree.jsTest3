import './style.css'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x0000ff)

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.z = 5
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Lys
const directionalLight = new THREE.DirectionalLight(0x8F756E, 1)
directionalLight.position.set(2, 1, 2)
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0x3D2B25, 0.5)
scene.add(ambientLight)

// Baggrund
const imgLoad = new THREE.TextureLoader()
imgLoad.load('/Billeder/ild.jpg', texture => {
  scene.background = texture
})

// Tekst
let textMesh // global variabel til animation
const fontLoader = new FontLoader()
fontLoader.load('/Fonts/Oi.json', font => {
  const textGeo = new TextGeometry('Griller', {
    font: font,
    size: 1,
    height: 0.5,
    curveSegments: 12,
  })

 textGeo.center() // centrer geometrien, rotation fra midten
 const loader = new THREE.TextureLoader()
const texture = loader.load('/Billeder/beef.jpeg')
texture.colorSpace = THREE.SRGBColorSpace
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(2, 1)

  const textMaterial = new THREE.MeshPhongMaterial({
    map: texture,        // billede som farve
    shininess: 10,       // lidt glans
    specular: 0x8F756E  // mørk highlight
  })

  textMesh = new THREE.Mesh(textGeo, textMaterial)
  scene.add(textMesh)
})

// Fog
const fogColor = 0xFF0000 // rødlig tåge
const near = 5
const far = 4
scene.fog = new THREE.Fog(fogColor, near, far)

// Animation
function animate() {
  requestAnimationFrame(animate)
  if (textMesh) {
    textMesh.rotation.x += 0.01
    textMesh.rotation.y += 0
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
