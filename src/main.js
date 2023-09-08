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
    './portfolio6.glb', // URL of the GLB model file
    (gltf) => {
      // This function will be called when the model is loaded successfully
      // 'gltf' is the loaded 3D model
      model = gltf.scene;
      scene.add(gltf.scene); // Add the model to your Three.js scene
      
    },
    (progress) => {
      // This function will be called while the model is loading and provide loading progress
      console.log((progress.loaded / progress.total) * 100 + '% loaded');
      
    },
    (error) => {
      // This function will be called if there's an error loading the model
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

  // const geometry = new THREE.BoxGeometry(2, 2, 2);
  // const material = new THREE.MeshStandardMaterial({color:0xffffff, emissive: 0xff0000,emissiveIntensity:1});
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
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
  

