import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Torus } from './environment/objects/Torus';
import { Plane } from './environment/objects/Plane';
import { Sphere } from './environment/objects/Sphere';
import { Star } from './environment/objects/Star';
import { HighlightSquare } from './environment/objects/HighlightSquare';

import { COLORS } from './constants/Colors';

//-- GLOBAL CONFIG --//
const PLANE_WIDTH = 50;
const PLANE_HEIGHT = 50;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#bg') });
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

camera.position.set(25, 25, 25);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

//-- OBJECTS --//
const torus = new Torus();
const sphere = new Sphere();
const plane = new Plane(PLANE_WIDTH, PLANE_HEIGHT);
const highlightSquare = new HighlightSquare();

scene.add(torus);
// scene.add(sphere);
scene.add(plane);
scene.add(highlightSquare);

//-- LIGHTS --//
// const pointLight = new THREE.PointLight(COLORS.white);
// pointLight.position.set(15, 15, 5);
//scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(COLORS.white);
scene.add(ambientLight);

// //-- FOG --//
// scene.fog = new THREE.Fog(
//   0xFFFFFF,
//   camera.position.z + 5,
//   camera.position.z + 200
// );

//-- HELPERS --//
// const pointLightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(pointLightHelper);
const gridHelper = new THREE.GridHelper(PLANE_WIDTH, PLANE_HEIGHT, 0x8eadff);
scene.add(gridHelper);

//-- CONTROLS --//
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 60;
controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI / 2; // radians
controls.enableDamping = true;   //damping 
controls.dampingFactor = 0.55;   //damping inertia
controls.enableZoom = true;      //Zooming
controls.autoRotate = true;
controls.autoRotateSpeed = 0.1;
controls.maxPolarAngle = Math.PI / 2; // Limit angle of visibility

//-- MOUSE INTERACTION --//
const mousePosition = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let intersects;

window.addEventListener('mousemove', function (e) {
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
  mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mousePosition, camera);
  intersects = raycaster.intersectObjects(scene.children);
  intersects.forEach(function (intersect) {
    if (intersect.object.name === 'ground') {
      const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
      highlightSquare.position.set(highlightPos.x, 0, highlightPos.z);
    }
  });
})

// const spaceTexture = new THREE.TextureLoader().load('./img/space.png');
// scene.background = spaceTexture;

//-- Object to be cloned by mouseclick --//
const sphereMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.4, 4, 2),
  new THREE.MeshBasicMaterial({
    wireframe: true,
    color: COLORS.torus
  })
);
const objects = [];
window.addEventListener('mousedown', function () {
  const objectExist = objects.find(function (object) {
    return (object.position.x === highlightSquare.position.x)
      && (object.position.z === highlightSquare.position.z)
  });

  if (!objectExist) {
    intersects.forEach(function (intersect) {
      if (intersect.object.name === 'ground') {
        const sphereClone = sphereMesh.clone();
        sphereClone.position.copy(highlightSquare.position);
        scene.add(sphereClone);
        objects.push(sphereClone);
      }
    })
  }
});

function addStar() {
  const star = new Star();
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(PLANE_WIDTH * 2));
  star.update(x, y, z);
  scene.add(star);
}

// ANIMATE LOOP
function animate() {
  requestAnimationFrame(animate);
  torus.update();
  controls.update();
  renderer.render(scene, camera);
}

// EXECUTION
Array(500).fill().forEach(addStar);
animate();