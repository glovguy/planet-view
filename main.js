import './style.css';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.filmGauge = 100;
camera.filmOffset = 100;
camera.focus = 0.001;


// Close panorama
camera.position.x = -0.003792507533639839
camera.position.y = 2.945836908993275
camera.position.z = -0.8037527760299142

camera.rotation.x = -1.837156655683214
camera.rotation.y = -0.0012420117680866415
camera.rotation.z = -3.1216026905486522

const panorPos = new THREE.Vector3(-0.003792507533639839, 2.945836908993275, -0.8037527760299142);
const panorRot = new THREE.Euler(-1.837156655683214, -0.0012420117680866415, -3.1216026905486522);

// Wide pearl shot

// camera.position.x = 0.0035896100274362287
// camera.position.y = 5.947716974917304
// camera.position.z = -0.08429324087868591

// camera.rotation.x = -1.5849677472427328
// camera.rotation.y = 0.0006034667022195056
// camera.rotation.z = 3.099037852894026

const pearlPos = new THREE.Vector3(0.0035896100274362287, 5.947716974917304, -0.08429324087868591);
const pearlRot = new THREE.Euler(-1.5849677472427328, 0.0006034667022195056, 3.099037852894026);
camera.position.set(pearlPos.x,pearlPos.y,pearlPos.z);
camera.rotation.set(pearlRot.x,pearlRot.y,pearlRot.z);

const cameraPath = panorPos.sub(pearlPos).multiplyScalar(0.0001);

// Vector3 {x: 0.0035896100274362287, y: 5.947716974917304, z: -0.08429324087868591}
// x: 0.0035896100274362287
// y: 5.947716974917304
// z: -0.08429324087868591
// [[Prototype]]: Object
// main.js:126 
// Euler {_x: -1.5849677472427328, _y: 0.0006034667022195056, _z: 3.099037852894026, _order: 'XYZ', _onChangeCallback: ƒ}
// _onChangeCallback: ƒ onRotationChange()
// _order: "XYZ"
// _x: -1.5849677472427328
// _y: 0.0006034667022195056


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

// const imgcanvas = document.getElementById('imgcanvas');
// imgcanvas.width = 8192; 
// imgcanvas.height = 4096;
// const imgctx = imgcanvas.getContext('2d');
// performance.mark('begin create image');
// const imageData = imgctx.createImageData(8192, 4096);
// performance.mark('begin iterate through pixels');
// for (let i = 0; i < imageData.data.length; i += 4) {
//   // Modify pixel data
//   imageData.data[i + 0] = Math.random()*255;  // R value
//   imageData.data[i + 1] = Math.random()*255;    // G value
//   imageData.data[i + 2] = Math.random()*255;  // B value
//   imageData.data[i + 3] = Math.random()*255;  // A value
// }
// performance.mark('begin put image data');
// imgctx.putImageData(imageData, 0, 0);
// performance.mark('begin generate data url');
// const jpgimg = imgcanvas.toDataURL('image/jpeg', 1);
// performance.mark('done');
// console.log(performance.measure('total time ', 'begin create image', 'done'))

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
const directionalLight = new THREE.DirectionalLight(0xfdfbd3, 1);
directionalLight.position.set(-50, 50, 50);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.001);
scene.add(directionalLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.01, 12, 12);
  const material = new THREE.MeshStandardMaterial({ color: 0xa6a9ba });
  material.roughness = 0;
  const star = new THREE.Mesh(geometry, material);

  // const [x, y, z] = Array(3)
  //   .fill()
  //   .map(() => THREE.MathUtils.randFloatSpread(100));

  // star.position.set(x, y, z);
  star.position.set(0,2.5,0);
  scene.add(star);
  return star;
}

// spaceship //
const geometry = new THREE.TetrahedronGeometry(0.01);
const material = new THREE.MeshStandardMaterial({ color: 0x8f564f });
material.roughness = 0;
const spaceship = new THREE.Mesh(geometry, material);

spaceship.position.set(0,2.5,0);
scene.add(spaceship);

// const stars = Array(200).fill().map(addStar);

// Background

// black-space.jpg is from Paul Volkmer via unsplash.com. Thank you! https://unsplash.com/photos/fX-qWsXl5x8
const spaceTexture = new THREE.TextureLoader().load('black-space.jpg');
scene.background = spaceTexture;

// Moon // 

const moonHiResTexture = new THREE.TextureLoader().load('8k_moon.jpeg', function() {
  console.log('loaded!');
  globe.clearGroups();
  globe.addGroup(0, globe.index.count, 1);
});
const normalHiResTexture = new THREE.TextureLoader().load('moon_normal.jpg');
const hiResMesh = new THREE.MeshStandardMaterial({
  map: moonHiResTexture,
  normalMap: normalHiResTexture,
  roughness: 1,
});

const moonLowResTexture = new THREE.TextureLoader().load('moon.jpg');
// const moonTexture =  new THREE.TextureLoader().load(jpgimg);
const normalLowResTexture = new THREE.TextureLoader().load('normal.jpg');
// const normalTexture = new THREE.TextureLoader().load(jpgimg);
const lowResMesh = new THREE.MeshStandardMaterial({
  map: moonLowResTexture,
  normalMap: normalLowResTexture,
  roughness: 1,
});

const globe = new THREE.SphereGeometry(3, 64, 64);
const moon = new THREE.Mesh(
  globe,
  [lowResMesh, hiResMesh],
);
globe.addGroup(0, globe.index.count, 0);

scene.add(moon);

moon.position.z = -2;
moon.position.setX(0);
moon.rotation.z = 1.80;

// Scroll Animation //

// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top;
//   moon.rotation.x += 0.0002;
// }

// document.body.onscroll = moveCamera;
// moveCamera();

// document.body.onclick = function printcameraloc() {
//   console.log(camera.position);
//   console.log(camera.rotation);
//   console.log(directionalLight.position);
// }

// Animation Loop
// const controls = new OrbitControls(camera, renderer.domElement);
let t = 0.0;
let lerpPhase = 0.0;
const lerpDelta = 0.00002;
let dest = new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z);

function animate() {
  requestAnimationFrame(animate);

  t += 0.3;
  const v = Math.cos(0.9+0.003*t);
  const w = Math.sin(0.9+0.003*t);

  directionalLight.position.set(-50*v, 50*w, 50);

  // stars.forEach(s => { s.position.x += 0.01; })
  // lerpPhase += lerpDelta;
  // if (lerpPhase < 0.89) { camera.position.lerp(panorPos, lerpDelta); }

  moon.rotation.x += 0.0001;

	camera.position.x += (dest.x - camera.position.x) * 0.05;
  camera.position.z += (dest.z - camera.position.z) * 0.05;
  camera.lookAt( spaceship.position );
  camera.rotation.set(pearlRot.x, camera.rotation.y, pearlRot.z);

  // controls.update();

  renderer.render(scene, camera);
}
animate();

document.addEventListener('mousemove', function(event) {
  const mouseX	= (event.clientX / window.innerWidth ) - 0.5;
  const mouseY	= (event.clientY / window.innerHeight) - 0.5;
  dest.x = pearlPos.x + (mouseX*3 - camera.position.x) * 0.3;
  dest.z = pearlPos.z + (mouseY*9 - camera.position.z) * 0.02;
  
}, false);
