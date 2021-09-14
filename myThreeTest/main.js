import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerWidth)
camera.position.setZ(30);

renderer.render( scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshBasicMaterial( { color: 0xc8660f, wireframe: true});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus)

function animate(){
  requestAnimationFrame( animate);
  torus.rotation.x += 0.01;
  renderer.render(scene, camera);

} 

animate()