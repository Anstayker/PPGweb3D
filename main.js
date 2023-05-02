import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf)
scene.add(gridHelper)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
cube.position.set(0, -2.5, -10)
cube.scale.set(0.5, 0.5, 0.5)
scene.add(cube)

camera.lookAt(cube.position)
camera.position.set(0, 5, 0)

window.addEventListener('resize', onWindowResize, false)


const gltfLoader = new GLTFLoader();
gltfLoader.load('models/StrokesScene.glb', (gltf) => {
  const mesh = gltf.scene;
  mesh.position.set(0, 0, 0);
  mesh.scale.set(1, 1, 1);


  scene.add(mesh);
  animate();
});

{
    const skyColor = 0xB1E1FF;
    const groundColor = 0xB97A20;
    const intensity = 0.6;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

{
    const color = 0xFFFFFF;
    const intensity = 0.8;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
}



function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function lerp(x, y , a) {
    return (1 - a) * x + a * y
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
    return (scrollPercent - start) / (end - start)
}

var animationScripts = [];

animationScripts.push({
    start: 0,
    end: 5,
    func: () => {

        //camera.lookAt(cube.position)

        const audioElement = document.getElementById('music1')
        audioElement.pause()
        
        const audioElement2 = document.getElementById('music2')
        audioElement2.pause()
        
        const audioElement3 = document.getElementById('music3')
        audioElement3.pause()
    }
})

//-------------- Animation Controller --------------

animationScripts.push({
    start: 5,
    end: 60,
    func: () => {
        //camera.lookAt(cube.position)
        camera.position.z = lerp(0, -100, scalePercent(5, 60))
        //console.log(camera.position.x + " " + camera.position.y + " " + camera.position.z)
        
    }
})

//-------------- Sound Controller --------------
animationScripts.push({
    start: 5,
    end: 35,
    func: () => {
        const audioElement = document.getElementById('music1')
        audioElement.play()
        
        const audioElement2 = document.getElementById('music2')
        audioElement2.pause()
        
        const audioElement3 = document.getElementById('music3')
        audioElement3.pause()
    }
})

animationScripts.push({
    start: 33,
    end: 65,
    func: () => {
        const audioElement = document.getElementById('music1')
        audioElement.pause()
        
        const audioElement2 = document.getElementById('music2')
        audioElement2.play()
        
        const audioElement3 = document.getElementById('music3')
        audioElement3.pause()
    }
})

animationScripts.push({
    start: 63,
    end: 101,
    func: () => {
        const audioElement = document.getElementById('music1')
        audioElement.pause()
        
        const audioElement2 = document.getElementById('music2')
        audioElement2.pause()
        
        const audioElement3 = document.getElementById('music3')
        audioElement3.play()
    }
})



/*

animationScripts.push({
    start: 0,
    end: 101,
    func: () => {
        let g = material.color.g
        g -= 0.05
        if (g <= 0) {
            g = 1.0
        }
        material.color.g = g     
        
    },
})

animationScripts.push({
    start: 0,
    end: 20,
    func: () => {
        camera.lookAt(cube.position)
        camera.position.set(0, 1, 2)
        cube.position.z = lerp(-10, 0, scalePercent(0, 20))
        //console.log(cube.position.z)
        const audioElement = document.getElementById('music1')
        audioElement.pause()
        
        const audioElement2 = document.getElementById('music2')
        audioElement2.pause()
        
        const audioElement3 = document.getElementById('music3')
        audioElement3.pause()
    },
})

animationScripts.push({
    start: 20,
    end: 60,
    func: () => {
        camera.lookAt(cube.position)
        camera.position.set(0, 1, 2)
        //camera.position.x = lerp(0, -5, scalePercent(40, 60))
        //camera.position.y = lerp(1, -5, scalePercent(40, 60))
        cube.rotation.z = lerp(0, Math.PI, scalePercent(20, 60))
        //camera.position.set(camera.position.x, camera.position.y, camera.position.z)
        //console.log(cube.rotation.z)
        const audioElement = document.getElementById('music1')
        audioElement.play()
        
        const audioElement2 = document.getElementById('music2')
        audioElement2.pause()
        
        const audioElement3 = document.getElementById('music3')
        audioElement3.pause()
    },
})

animationScripts.push({
    start: 60,
    end: 80,
    func: () => {
        camera.position.x = lerp(0, 5, scalePercent(60, 80))
        camera.position.y = lerp(1, 5, scalePercent(60, 80))
        camera.lookAt(cube.position)
        //console.log(camera.position.x + " " + camera.position.y)
        const audioElement = document.getElementById('music1')
        audioElement.pause()
        
        const audioElement2 = document.getElementById('music2')
        audioElement2.play()
        
        const audioElement3 = document.getElementById('music3')
        audioElement3.pause()
    },
})

animationScripts.push({
    start: 80,
    end: 101,
    func: () => {
        //auto rotate
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01

        const audioElement = document.getElementById('music1')
        audioElement.pause()
        
        const audioElement2 = document.getElementById('music2')
        audioElement2.pause()
        
        const audioElement3 = document.getElementById('music3')
        audioElement3.play()
    },
})

*/

function playScrollAnimations() {
    animationScripts.forEach((a) => {
        if (scrollPercent >= a.start && scrollPercent < a.end) {
            a.func()
        }
    })
}

document.body.onscroll = () => {
    //calculate the current scroll progress as a percentage
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        100
    ;

}

let scrollPercent = 0

function animate() {
    requestAnimationFrame(animate)

    playScrollAnimations()

    render()

}

function render() {
    renderer.render(scene, camera)
}

window.scrollTo({ top: 0, behavior: 'smooth' })
animate()