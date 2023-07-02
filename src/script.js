import './style.css'

import { Vector3 } from "three";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import Balloon from './physics/balloon';
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/*
*debug ui
*/
const gui=new dat.GUI()







//alra3i first code
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Add some lights to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(ambientLight, pointLight);



//Create ground
const textureLoader = new THREE.TextureLoader();
const grassTexture = textureLoader.load('t2.jpg') 
grassTexture.wrapS = THREE.RepeatWrapping;                               
grassTexture.wrapT = THREE.RepeatWrapping; 
grassTexture.repeat.set(5, 5); 

const groundGeometry = new THREE.CircleGeometry( 1925, 32 ); 
const groundMaterial = new THREE.MeshBasicMaterial( { map: grassTexture,side: THREE.DoubleSide } ); 
const circle = new THREE.Mesh( groundGeometry, groundMaterial );
circle.rotation.x = - Math.PI / 2;
circle.position.y=-500
 scene.add( circle );





// Create a sky sphere
const skyTexture = new THREE.TextureLoader().load('s.jpg') 
const skyGeometry = new THREE.SphereGeometry(2000, 60, 40);
const skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });
const skySphere = new THREE.Mesh(skyGeometry, skyMaterial);
skySphere.material.map.wrapS = THREE.RepeatWrapping;
skySphere.material.map.wrapT = THREE.RepeatWrapping;
skySphere.material.map.repeat.set(1, -1);
scene.add(skySphere);






// Create a texture from an image file
const balloonTexture = textureLoader.load('balloon_model/balloon_b.jpg');
const basketTexture = textureLoader.load('balloon_model/basket.jpg');
const burnerTexture = textureLoader.load('balloon_model/burner.jpg');
const balloonTopTexture = textureLoader.load('balloon_model/11809_Hot_air_balloon_Baloon_top_diff.jpg');
const basketSpecTexture = textureLoader.load('balloon_model/11809_Hot_air_balloon_Basket_spec.jpg');
const basketSupportTexture = textureLoader.load('balloon_model/11809_Hot_air_balloon_Basket_support_diff.jpg');
const burnerSpecTexture = textureLoader.load('balloon_model/11809_Hot_air_balloon_Burner_spec.jpg');
const floorTexture = textureLoader.load('balloon_model/11809_Hot_air_balloon_Floor_diff.jpg');
const basketSupportSpecTexture = textureLoader.load('balloon_model/11809_Hot_air_balloon_Basket_support_spec.jpg');
const reflTexture = textureLoader.load('balloon_model/11809_Hot_air_balloon_refl.jpg');

 // Create a materials for the balloon with its textures
 const balloonMaterial = new THREE.MeshBasicMaterial({
  map: balloonTexture,
});
const basketMaterial = new THREE.MeshBasicMaterial({
  map: basketTexture,
});
const burnerMaterial = new THREE.MeshBasicMaterial({
  map: burnerTexture,
});
const balloonTopMaterial = new THREE.MeshBasicMaterial({
  map: balloonTopTexture,
});
const basketSpecMaterial = new THREE.MeshBasicMaterial({
  map: basketSpecTexture,
});
const basketSupportMaterial = new THREE.MeshBasicMaterial({
  map: basketSupportTexture,
});
const burnerSpecMaterial = new THREE.MeshBasicMaterial({
  map: burnerSpecTexture,
});
const floorMaterial = new THREE.MeshBasicMaterial({
  map: floorTexture,
});
const basketSupportSpecMaterial = new THREE.MeshBasicMaterial({
  map: basketSupportSpecTexture,
});
const reflMaterial = new THREE.MeshBasicMaterial({
  map: reflTexture,
});


const loader = new OBJLoader();

// Create a new instance of the Balloon class
const balloonPhysics = new Balloon(new THREE.Vector3(0, -500, 0));

gui.add(balloonPhysics,'basketMass',50,2000,5)
gui.add(balloonPhysics,'balloonV',2000,8000,5)
gui.add(balloonPhysics,'temperature',0,200,1)
gui.add(balloonPhysics,'dt',0.001,0.01)
gui.add(balloonPhysics,'vx',-100,100,1)
gui.add(balloonPhysics,'vz',-100,100,1)



// Load the model
loader.load(
  // The URL of the model file
  'balloon_model/hot_air_balloon.obj',
  // The onLoad function, which is called when the model is loaded

  (obj) => {

    // Get the root object of the model
    const model = obj;
    model.rotation.x = - Math.PI / 2;
    model.position.y=-500
    model.scale.set(balloonPhysics.balloonV/400000,balloonPhysics.balloonV/400000,balloonPhysics.balloonV/400000) 

    // set the movement speed of the cube
const moveSpeed = 2;

// add an event listener for the keydown event
document.addEventListener('keydown', function(event) {
  switch (event.key) {
      case 't': // down arrow
      balloonPhysics.temperature+=1;
     
      break;

      case 'r': // down arrow
      balloonPhysics.temperature-=1;
     
      break;

      case 'x': // down arrow
      balloonPhysics.vx+=1;
     
      break;

      case 'z': // down arrow
      balloonPhysics.vz+=1;
     
      break;
  }
});

   
    

      

  // Assign the materials to the appropriate parts of the model
  model.traverse((child) => {
  if (child instanceof THREE.Mesh && child.name === '11809_Hot_air_balloon_Balloon') {
    child.material = balloonMaterial;
  }});
model.traverse((child) => {
if (child instanceof THREE.Mesh && child.name === '11809_Hot_air_balloon_Basket') {
  child.material = basketMaterial;
}});
model.traverse((child) => {
if (child instanceof THREE.Mesh && child.name === '11809_Hot_air_balloon_Support_Base') {
  child.material = basketSupportMaterial;
}});
model.traverse((child) => {
if (child instanceof THREE.Mesh && child.name === '11809_Hot_air_balloon_Floor') {
  child.material = floorMaterial;
}});
model.traverse((child) => {
if (child instanceof THREE.Mesh && child.name === '11809_Hot_air_balloon_Fasteners') {
  child.material = burnerMaterial;
}});
model.traverse((child) => {
if (child instanceof THREE.Mesh && child.name === '11809_Hot_air_balloon_Burner') {
  child.material = burnerMaterial;
}});
model.traverse((child) => {
if (child instanceof THREE.Mesh && child.name === '11809_Hot_air_balloon_Burners_det') {
  child.material = burnerSpecMaterial;
}});
model.traverse((child) => {
if (child instanceof THREE.Mesh && child.name === '11809_Hot_air_balloon_Top') {
  child.material = balloonTopMaterial;
}});
model.traverse((child) => {
if (child instanceof THREE.Mesh && child.name === '11809_Hot_air_balloon_Burners_det_L') {
  child.material = burnerSpecMaterial;
}});
model.traverse((child) => {
if (child instanceof THREE.Mesh && child.name === '11809_Hot_air_balloon_Burner001') {
  child.material = burnerSpecMaterial;
}});



function animate() {
  requestAnimationFrame(animate);

  // Update the balloon physics and position
  balloonPhysics.update(balloonPhysics.dt);
  //console.log('Net Force =',balloonPhysics.netForceT);
  //console.log('air',balloonPhysics.airResistence().y);
 // console.log('rho',balloonPhysics.rhoB)
  //console.log('weight',balloonPhysics.weight.y)
  //console.log('lift = ',balloonPhysics.lift.y)
  //console.log('temp',balloonPhysics.temperature)
 // console.log('velocity',balloonPhysics.velocity)
  //console.log('rhoA',balloonPhysics.rhoA);
  model.position.copy(balloonPhysics.getPosition());
  
  
  

  renderer.render(scene, camera);
  controls.target.set(model.position.x,model.position.y,model.position.z)
  model.scale.set(balloonPhysics.balloonV/500000,balloonPhysics.balloonV/500000,balloonPhysics.balloonV/500000)
  controls.update

  
}

animate();

    // Add the model to the scene
    scene.add(model);
  },

  // The onProgress function, which is called while the model is loading
  (xhr) => {
    console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`);
  },
  // The onError function, which is called if there is an error loading the model
  (error) => {
    console.error(`Error loading model: ${error}`);
  }
);



const gLTFLoader = new GLTFLoader()
gLTFLoader.load('tree_model/scene.gltf',(obj)=>{
  const model = obj;
  // model.rotation.x = - Math.PI / 2;
  model.scene.position.y=-500
  model.scene.position.x=50
  model.scene.scale.set(35,35,35) 
  scene.add(model.scene)
})
const gLTFLoader1 = new GLTFLoader()
gLTFLoader1.load('windmill_model/scene.gltf',(obj)=>{
  const model = obj;
    model.scene.rotation.y =  Math.PI / 3;

  model.scene.position.set(180,-500,-400)
  model.scene.scale.set(80,80,80) 
  scene.add(model.scene)
})



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize',()=>{
    // update sizes
    sizes.width=window.innerWidth
    sizes.height= window.innerHeight 
    // update camera
    camera.aspect=sizes.width / sizes.height
    camera.updateProjectionMatrix()
// update renderer
renderer.setSize(sizes.width, sizes.height) 
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2   ))

})
window.addEventListener('dblclick',()=>{
    if(!document.fullscreenElement){
        canvas.requestFullscreen()
    }
    else {
        document.exitFullscreen()
    }
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.z = 60
camera.position.y= - 460

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.maxPolarAngle=Math.PI /1.5
controls.target.set(0,-500,0)
controls.enableDamping = true
controls.maxDistance=1300
controls.screenSpacePanning.Balloon



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
