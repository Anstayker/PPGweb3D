import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

function main() {

	const canvas = document.querySelector('#c');
	const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
	renderer.outputEncoding = THREE.sRGBEncoding;
	
	const fov = 45;
	const aspect = 2;  // the canvas default
	const near = 0.1;
	const far = 100;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(200000, 10, 20);

	const controls = new OrbitControls(camera, canvas);
	controls.target.set(0, 5, 0);
	controls.update();  

	const scene = new THREE.Scene();
	scene.background = new THREE.Color('#DEFEFF');

	
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

	function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
		const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
		const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
		const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);

		const direction = (new THREE.Vector3())
			.subVectors(camera.position, boxCenter)
			.multiply(new THREE.Vector3(1, 0, 1))
			.normalize();
	
		camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
	
		camera.near = boxSize / 100;
		camera.far = boxSize * 100;
	
		camera.updateProjectionMatrix();
	
		camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
	  }
	
	  {
		const gltfLoader = new GLTFLoader();
		gltfLoader.load('cartoon_lowpoly_small_city_free_pack.glb', (gltf) => {
		  const root = gltf.scene;
		  scene.add(root);
	
		  const box = new THREE.Box3().setFromObject(root);
	
		  const boxSize = box.getSize(new THREE.Vector3()).length();
		  const boxCenter = box.getCenter(new THREE.Vector3());
	
		  frameArea(boxSize * 0.5, boxSize, boxCenter, camera);

		  controls.maxDistance = boxSize * 10;
		  controls.target.copy(boxCenter);
		  controls.update();
		});
	  }

	  function resizeRendererToDisplaySize(renderer) {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
		  renderer.setSize(width, height, false);
		}
		return needResize;
	  }

	  function render() {
		if (resizeRendererToDisplaySize(renderer)) {
		  const canvas = renderer.domElement;
		  camera.aspect = canvas.clientWidth / canvas.clientHeight;
		  camera.updateProjectionMatrix();
		}
	
		renderer.render(scene, camera);
	
		requestAnimationFrame(render);
	  }
	
	  requestAnimationFrame(render);

/*
	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	
	camera.position.z = 5;
	
	const color = 0xFFFFFF;
	const intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(0, 10, 0);
	light.target.position.set(-5, 0, 0);
	scene.add(light);
	scene.add(light.target);
	
	scene.background = new THREE.Color('#FFFFFF')
*/
	
	const loader = new GLTFLoader();
	
	loader.load( 'monaPrueba.glb', function ( gltf ) {
	
		scene.add( gltf.scene );
	
	}, undefined, function ( error ) {
	
		console.error( error );
	
	} );
	
	/*

	function animate() {
		requestAnimationFrame( animate );
	
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
	
		renderer.render( scene, camera );
	}
	
	animate();

	*/
	
}

main();

