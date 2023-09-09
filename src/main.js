import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  
  // Get a reference to the container element that will hold our scene
  const canvas = document.querySelector('.canvas');
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({canvas:canvas});
  let sizes = {
    width:window.innerWidth,
    height:window.innerHeight
  }

let model;
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(
    './portfolio6.glb',
    (gltf) => {
      model = gltf.scene;
      scene.add(gltf.scene); 
    },
    (progress) => {
      console.log((progress.loaded / progress.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('Error loading model:', error);
    }
  );


  scene.background = new THREE.Color('black');
  const fov = 75; 
  const aspect = sizes.width / sizes.height;
  const near = 0.1; 
  const far = 300;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  scene.add(camera);
  camera.position.set(0, 15, 20);
  const controls = new OrbitControls(camera,canvas);
  renderer.setSize(sizes.width, sizes.height);
  window.addEventListener('resize',()=>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    console.log(aspect);
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
  });
  const light =new THREE.DirectionalLight(0xffffff,0.4);
  scene.add(light);
  light.position.set(-50,50,0);
  const clock = new THREE.Clock();
  const animate = ()=>{
    const elapsedTime = clock.getElapsedTime();
    controls.update();
    requestAnimationFrame(animate)
    renderer.render(scene, camera);
  }
  animate();
  
