import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const COLORS = {
  white: 0xffffff,
  black: 0x000000,
  torus: 0x8AEB00,
}

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(30, 15, 30);

//renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 50);
//const material = new THREE.MeshBasicMaterial({ color: 0xe6e7e8, wireframe: true });
const material = new THREE.MeshStandardMaterial({ color: COLORS.torus });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// LIGHT
const pointLight = new THREE.PointLight(COLORS.white);
const ambientLight = new THREE.AmbientLight(COLORS.white);
pointLight.position.set(15, 15, 5);
scene.add(pointLight, ambientLight);

// HELPERS
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 30, 0x8eadff);
scene.add(lightHelper, gridHelper);

// CONTROL
const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: COLORS.white });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
}

// ANIMATE LOOP
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.001;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

// const spaceTexture = new THREE.TextureLoader().load('./img/space.png');
// scene.background = spaceTexture;

Array(5000).fill().forEach(addStar);

animate();
