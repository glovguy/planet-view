import './style.css';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.filmGauge = 100;
camera.filmOffset = 100;
camera.focus = 0.001;

camera.position.x = -0.003792507533639839
camera.position.y = 2.945836908993275
camera.position.z = -0.8037527760299142

camera.rotation.x = -1.837156655683214
camera.rotation.y = -0.0012420117680866415
camera.rotation.z = -3.1216026905486522

// x: -0.003792507533639839
// y: 2.945836908993275
// z: -0.8037527760299142
// [[Prototype]]: Object
// main.js:120
// Euler
// _onChangeCallback: ƒ onRotationChange()
// _order: "XYZ"
// _x: -1.837156655683214
// _y: -0.0012420117680866415


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// Torus

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// Lights

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(-50, -50, 50);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-50, 50, 50);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
scene.add(directionalLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
  return star;
}

// const stars = Array(200).fill().map(addStar);

// Background

// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

// Moon

const moonTexture = new THREE.TextureLoader().load('8k_moon.jpeg');
const normalTexture = new THREE.TextureLoader().load('moon_normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 64, 64),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
    roughness: 1,
  })
);

scene.add(moon);

moon.position.z = -2;
moon.position.setX(0);
moon.rotation.y = 0.5;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.0002;
  // moon.rotation.y += 0.00075;
  // moon.rotation.z += 0.0005;

  // camera.position.z = t * -0.01;
  // camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0005;
}

// document.body.onscroll = moveCamera;
document.body.onclick = function printcameraloc() {
  console.log(camera.position);
  console.log(camera.rotation);
}
// moveCamera();

// Animation Loop

let t = 0.0;

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
  t += 1;
  const v = Math.cos(0.003*t);

  directionalLight.position.set(-50*v, 50*v, 50);

  // stars.forEach(s => { s.position.x += 0.01; })

  moon.rotation.x += 0.0001;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
