import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';



// // Create a WebGL renderer
// const renderer = new THREE.WebGLRenderer();
// //canvas
// const canvas = document.querySelector('canvas.webgl')


// // Create a scene and camera
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 3;

// // Controls
// const controls = new OrbitControls(camera, canvas)
//  controls.enableDamping = true




// //Create ground
// const grassTexture = new THREE.TextureLoader().load('grass.jpg') 
// grassTexture.wrapS = THREE.RepeatWrapping;                               
// grassTexture.wrapT = THREE.RepeatWrapping; 
// grassTexture.repeat.set(5, 5); 

// const groundGeometry = new THREE.PlaneGeometry(30,30, 1, 1);
// const groundMaterial = new THREE.MeshBasicMaterial({ map: grassTexture });
// const ground = new THREE.Mesh(groundGeometry, groundMaterial);
// scene.add(ground);





// // Create a texture
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load('door.jpg');
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set(8, 8);
// texture.encoding = THREE.sRGBEncoding;

// // Create a sky dome
// const geometry = new THREE.SphereGeometry(1, 32, 32);
// const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
// const skyDome = new THREE.Mesh(geometry, material);
// scene.add(skyDome);

// // Add a cube to the scene
// const cubeGeometry = new THREE.BoxGeometry();
// const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// scene.add(cube);

// // Add some lights to the scene
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(5, 5, 5);
// scene.add(ambientLight, pointLight);




// // Render the scene
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// function animate() {
    
//     renderer.render(scene, camera);

//   requestAnimationFrame(animate);
  
// }
// animate();



//alra3i first code
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
 

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)

const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }))
scene.add(mesh)

//Create ground
const grassTexture = new THREE.TextureLoader().load('grass.jpg') 
grassTexture.wrapS = THREE.RepeatWrapping;                               
grassTexture.wrapT = THREE.RepeatWrapping; 
grassTexture.repeat.set(5, 5); 

// const groundGeometry = new THREE.PlaneGeometry(900,900, 1, 1);
// const groundMaterial = new THREE.MeshBasicMaterial({ map: grassTexture, side: THREE.DoubleSide });
// const ground = new THREE.Mesh(groundGeometry, groundMaterial);
// ground.rotation.set(Math.PI/2, 0, 0);
// ground.position.y=-500
// scene.add(ground);

/// Create a ground plane
// const groundGeometry = new THREE.PlaneGeometry(1800, 1800);
// const groundMaterial = new THREE.MeshBasicMaterial({ map: grassTexture,side: THREE.DoubleSide });
// const ground = new THREE.Mesh(groundGeometry, groundMaterial);
// ground.rotation.x = - Math.PI / 2;
// ground.position.y=-500
// scene.add(ground);

const groundGeometry = new THREE.CircleGeometry( 865, 32 ); 
const groundMaterial = new THREE.MeshBasicMaterial( { map: grassTexture,side: THREE.DoubleSide } ); 
const circle = new THREE.Mesh( groundGeometry, groundMaterial );
circle.rotation.x = - Math.PI / 2;
circle.position.y=-500
 scene.add( circle );


// // Create a sky dome
// const skyTexture = new THREE.TextureLoader().load('sky.jpg') 
// const skygeometry = new THREE.SphereGeometry(600, 32, 32);
// const skymaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });
// const skyDome = new THREE.Mesh(skygeometry, skymaterial);
// scene.add(skyDome);

// Create a sky sphere
const skyTexture = new THREE.TextureLoader().load('sky.jpg') 
// skyTexture.wrapS = THREE.RepeatWrapping;                               
// skyTexture.wrapT = THREE.RepeatWrapping; 
// skyTexture.repeat.set(3, 3); 


const skyGeometry = new THREE.SphereGeometry(1000, 60, 40);
const skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });
const skySphere = new THREE.Mesh(skyGeometry, skyMaterial);
skySphere.material.map.wrapS = THREE.RepeatWrapping;
skySphere.material.map.wrapT = THREE.RepeatWrapping;
skySphere.material.map.repeat.set(1, -1);
scene.add(skySphere);


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
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

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

    mesh.rotation.y+=0.01

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()