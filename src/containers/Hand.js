import React from 'react';
//import ReactDOM from "react-dom";
import * as THREE from "three";
import GLTFLoader from 'three-gltf-loader';
import TWEEN from '@tweenjs/tween.js';


const scene1 = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera( 75, (window.innerWidth/2)/(window.innerHeight/2), 0.1, 1000 );
const renderer1 = new THREE.WebGLRenderer();


export default class PolishesShelf extends React.Component {



	componentDidMount() {

		renderer1.setSize( window.innerWidth/2, window.innerHeight/2 );
	    // document.body.appendChild( renderer.domElement );
	     this.mount.appendChild( renderer1.domElement );
	     scene1.background = new THREE.Color( 'white' );
	     
	    camera1.position.z = 7;

	    let pointLight =
          new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 0;
        pointLight.position.y = 0;
        pointLight.position.z = 4;

        // add to the scene
		var axesHelper = new THREE.AxesHelper( 5 );
		scene1.add( axesHelper );
        scene1.add(pointLight);
	}



	nail_shape_geom(color, texture){

		let loader = new GLTFLoader();
		let mesh, mesh1;

		loader.load(
			require('../nail_simple2.glb'),
			function(gltf) {
				

	
				 mesh = gltf.scene.children[0]


//LEAVE THAT - THAT S FOR SMOOTHNESS********************************************
				 mesh.geometry = new THREE.Geometry().fromBufferGeometry( mesh.geometry );
			    mesh.geometry.mergeVertices();
			    mesh.geometry.computeVertexNormals();
			    mesh.geometry = new THREE.BufferGeometry().fromGeometry( mesh.geometry );
//********************************************************************************

				 //mesh.rotation.z = Math.PI 

				 mesh.rotation.x = Math.PI 

				 mesh.position.set(0, 0, 3)
				mesh.material = new THREE.MeshPhongMaterial( {color} );
				console.log(mesh.material)
				//mesh.material.flatshading = THREE.SmoothShading;


				//var textureLoader = new THREE.TextureLoader();
	
				
				mesh.material.needsUpdate = true
				 if (texture instanceof THREE.CanvasTexture) {

				
				    texture.flipY = false;
				  //   texture.wrapS = THREE.RepeatWrapping;
				 	// texture.wrapT = THREE.RepeatWrapping;
					mesh.material.map = texture
					mesh.material.needsUpdate = true


			  	mesh.material.map.needsUpdate = true;

				 }


				scene1.add(mesh);
				
				var tween = new TWEEN.Tween(mesh.rotation)
			        //.to({ x: [2.4, 3.14, 7, 3.14]}, 2000)
			        .to({ x: [0.4, 3.14, 0.4, 3.14]}, 9000)
			        .repeat(Infinity)
			        .start();

				


				let sphereG = new THREE.SphereGeometry(1, 16, 16);

			    let sphereM = new THREE.MeshPhongMaterial( color);
		   
		    	let ball  = new THREE.Mesh( sphereG, sphereM );
					scene1.add(ball)
					ball.position.x = 4
			
				
				if (texture instanceof THREE.CanvasTexture) {
					 ball.material.map = texture
				}
				var tween = new TWEEN.Tween(ball.rotation)
			        .to({ x: [0, 3.14, 0]}, 4000)
			        .repeat(Infinity)
			        .start();

			}
			
		);
		
		return mesh

		

	}
	// nail_shape_geom_primitive(){
	// 	var shape = new THREE.Shape();
	// 	shape.moveTo( 0,0 );
	// 	shape.bezierCurveTo(0.2, 0.5, 1.8, 0.5, 2, 0);
		

	// 	var extrudeSettings = {
	// 		amount: 2,
	// 		beveThickness:0.01,
	// 		 bevelEnabled: false,
	// 		 bevelSize: 0.01,
	// 		 bevelSegments:2,
		
	// 	};

	//  	let geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	//  	return geom
	// }

	draw(){
		//cleaning the scene
	 	scene1.remove.apply(scene1, scene1.children.filter(child => child instanceof THREE.Mesh));
		//console.log(scene1.children)
		let polish = this.props.currentPolish

	 	let color =  new THREE.Color(`rgb(${polish.red}, ${polish.green}, ${polish.blue})`);;
		//let material = new THREE.MeshPhongMaterial( {color} );
		// material.emissive = new THREE.Color('white')
		// material.shininess = 40
		// material.specular = new THREE.Color()

		//let nails = []

		
		let nail_shape = this.nail_shape_geom(color, this.props.currentTexture);
		

	console.log("in draw")

	 	
		var animate = function () {
	      requestAnimationFrame( animate );

	       TWEEN.update();
			// if (scene1.children[2])
			// 	if (scene1.children[2].material) 
			// 		if (scene1.children[2].material.map) 
			// 	scene1.children[2].material.map.needsUpdate = true
	     	
	      renderer1.render( scene1, camera1 );
	    };
	    animate();
	 	
	 }


	render() {
		
		this.draw()
	    return(
	        <div className="hand" ref={ref => (this.mount = ref)} />

		        		
	    )
	  }
}