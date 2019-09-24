import React from 'react';
//import ReactDOM from "react-dom";
import * as THREE from "three";
import GLTFLoader from 'three-gltf-loader';
import TWEEN from '@tweenjs/tween.js';


const scene1 = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera( 75, (window.innerWidth/2)/(window.innerHeight/2), 0.1, 1000 );
const renderer1 = new THREE.WebGLRenderer({ antialias: true });
const flesh_color = "rgb(249, 215, 193)"
let mouse = new THREE.Vector3();
//let container = document.getElementById('hand_div');

export default class Hand extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			project:{}
		}
	}



	componentDidMount() {

		
		if (this.props.current_project){
			this.setState({project:this.props.current_project})
		}

		renderer1.setSize( window.innerWidth/2, window.innerHeight/2 );
	     this.mount.appendChild( renderer1.domElement );
	     scene1.background = new THREE.Color( 'white' );
	     
	    camera1.position.z = 9;

	    camera1.position.x = 1;

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

	onMouseMove (e){
		let vector 
		//renderer1.getSize(vector)
		
		mouse.x = (e.clientX/window.innerWidth) *2  - 1;
		mouse.y = -(e.clientY/window.innerHeight)*2  + 1;
				
		mouse = mouse.unproject(camera1)
		let raycaster = new THREE.Raycaster(camera1.position, mouse.sub(camera1.position).normalize())
		let intersects = raycaster.intersectObjects(scene1.children)
		if (intersects.length > 0) {
			if (intersects[0].object instanceof THREE.Mesh) {
				//console.log(intersects[0].object)
				//intersects[0].object.material.emissive.setHex(0xff0000)
			}
					

			
		}
		//console.log(intersects)
	}

	onMouseClick (){
		console.log('clicking')
	}
// 	finger(){
// 		let loader = new GLTFLoader();
// 		let mesh;
// 		let color = new THREE.Color(flesh_color)

// 		loader.load(
// 			require('../finger_kinda.glb'),
// 			function(gltf) {
// 				 mesh = gltf.scene.children[0]
// //LEAVE THAT - THAT S FOR SMOOTHNESS********************************************
// 				 mesh.geometry = new THREE.Geometry().fromBufferGeometry( mesh.geometry );
// 			    mesh.geometry.mergeVertices();
// 			    mesh.geometry.computeVertexNormals();
// 			    mesh.geometry = new THREE.BufferGeometry().fromGeometry( mesh.geometry );
// //********************************************************************************
// 			 //mesh.rotation.z = Math.PI 
// 				 mesh.rotation.x = Math.PI 

// 				 mesh.position.set(0, 0, 0)
// 				mesh.material = new THREE.MeshLambertMaterial( {color} );
// 				console.log(mesh.material)
// 				//mesh.material.flatshading = THREE.SmoothShading;
// 				//var textureLoader = new THREE.TextureLoader();
				
// 				mesh.material.needsUpdate = true
				

// 				scene1.add(mesh);
							
// 				var tween = new TWEEN.Tween(mesh.rotation)
// 			        //.to({ x: [2.4, 3.14, 7, 3.14]}, 2000)
// 			        .to({ x: [2.4, 4.14, 0, 3.14]}, 2000)
// 			        .repeat(Infinity)
// 			        .start();
// 			    });

// 	}

	nail_shape_geom(name, color, texture, position){

		let loader = new GLTFLoader();
		let mesh, mesh1;

		loader.load(
			require('../nail_simple3.glb'),
			function(gltf) {
				 mesh = gltf.scene.children[0]
//LEAVE THAT - THAT S FOR SMOOTHNESS********************************************
				mesh.geometry = new THREE.Geometry().fromBufferGeometry( mesh.geometry );
			    mesh.geometry.mergeVertices();
			    mesh.geometry.computeVertexNormals();
			    mesh.geometry = new THREE.BufferGeometry().fromGeometry( mesh.geometry );
//********************************************************************************
			
				 mesh.rotation.z = Math.PI/2 

				mesh.position.set(position[0], position[1], position[2])
				mesh.material = new THREE.MeshPhongMaterial( );
				//console.log(mesh.material)
				//mesh.material.flatshading = THREE.SmoothShading;
				//var textureLoader = new THREE.TextureLoader();
				
				mesh.material.needsUpdate = true
				 if (texture instanceof THREE.CanvasTexture) {			
				    texture.flipY = false;
				 
				 	texture.offset.y = 1
				 	texture.rotation = Math.PI/2
					mesh.material.map = texture


					mesh.material.needsUpdate = true
				  	mesh.material.map.needsUpdate = true;

				 }
				 if (texture === "naked.png") {

				 	//mesh.material = new THREE.MeshLambertMaterial(new THREE.Color(flesh_color));
				 	console.log( "naked")

				 }else{
				 	console.log( "not naked")

					 
					 let texture1 = new THREE.TextureLoader().load( texture);
						 texture1.flipY = false;
					 
					 	texture1.offset.y = 1
					 	texture1.rotation = Math.PI/2
					mesh.material.map = texture1 


					mesh.material.needsUpdate = true
				  	mesh.material.map.needsUpdate = true;

				 }
				

				mesh.name = name
				scene1.add(mesh);

				var tween = new TWEEN.Tween(mesh.rotation)
			        //.to({ x: [2.4, 3.14, 7, 3.14]}, 2000)
			        .to({ y: [0, 0.5, 0, -0.5, 0]}, 4000)
			        .repeat(Infinity)
			        .start();
				
			}
			
		);
		
		return mesh

		

	}
	
	draw(){
		//cleaning the scene
	 	scene1.remove.apply(scene1, scene1.children.filter(child => child instanceof THREE.Mesh));

		let polish = this.props.currentPolish

	 	let color =  new THREE.Color(`rgb(${polish.red}, ${polish.green}, ${polish.blue})`);;
		
		console.log(this.props.nails)

		let nail_shape_pinky = this.nail_shape_geom("pinky", color, this.props.nails.find(nail => nail.name === "left_pinky").texture, [-3.5, -2.5, -3]);
		let nail_shape_ring = this.nail_shape_geom("ring",color, this.props.nails.find(nail => nail.name === "left_ring").texture, [0, -0.3, 0]);
		let nail_shape_middle = this.nail_shape_geom("middle", color, this.props.nails.find(nail => nail.name === "left_middle").texture, [2.5, 1, 0]);
		let nail_shape_index = this.nail_shape_geom("index", color,this.props.nails.find(nail => nail.name === "left_index").texture, [5, 0, 0]);
		let nail_shape_thumb = this.nail_shape_geom("thumb", color, this.props.nails.find(nail => nail.name === "left_thumb").texture, [7, -4, 1]);

		//let finger = this.finger()

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
		console.log(this.props.nails)
		this.draw()
	    return(
	    	<div>
		        <div id="hand_div" className="hand" 
							        ref={ref => (this.mount = ref)} 
							        onMouseMove={this.onMouseMove} 
							        onClick={this.onMouseClick}></div>
				<div className="finger_chose_panel">
					<div className="finger_btn" onClick={() =>this.props.onChoseFinger("pinky")} >Pinky</div>
					<div className="finger_btn" onClick={() =>this.props.onChoseFinger("ring")} >Ring</div>
					<div className="finger_btn" onClick={() =>this.props.onChoseFinger("middle")} >Middle</div>
					<div className="finger_btn" onClick={() =>this.props.onChoseFinger("index")} >Index</div>
					<div className="finger_btn" onClick={() =>this.props.onChoseFinger("thumb")} >Thumb</div>
				</div>

	        </div>
		        		
	    )
	  }
}