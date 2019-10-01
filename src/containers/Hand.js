import React from 'react';
//import ReactDOM from "react-dom";
import * as THREE from "three";
import GLTFLoader from 'three-gltf-loader';
import TWEEN from '@tweenjs/tween.js';
import EmptyImage from './../EmptyImage.png';
import NakedNail from './../naked.png';




const scene1 = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera( 75, (window.innerHeight/2)/(window.innerHeight/2), 0.1, 1000 );
const renderer1 = new THREE.WebGLRenderer({ antialias: true });
const flesh_color = "rgb(249, 215, 193)"
const bg_color = "rgb(220, 220, 220)"

let mouse = new THREE.Vector3();
let group = new THREE.Group();

//let container = document.getElementById('hand_div');

export default class Hand extends React.Component {

	constructor(props){
		super(props)

		this.state = {
			project:{}
		}
	}



	componentDidMount= () => {

		//console.log("hand mounted")
		group = new THREE.Group();
		for (var i = group.children.length - 1; i >= 0; i--) {
		    group.remove(group.children[i]);
		}

		for (var i = scene1.children.length - 1; i >= 0; i--) {
		    scene1.remove(scene1.children[i]);
		}
		//debugger
		//console.log(group.children.length)

		if (this.props.current_project){
			this.setState({project:this.props.current_project})
		}

		renderer1.setSize( window.innerHeight/2, window.innerHeight/2 );
	     this.mount.appendChild( renderer1.domElement );
	     scene1.background = new THREE.Color( bg_color );
	     
	    camera1.position.z = 0.185;

	     camera1.position.y = 0.065;
	    // camera1.position.x = 0.075;


	    let pointLight =
          new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 0;
        pointLight.position.y = 1;
        pointLight.position.z = 4;

        // add to the scene
		//var axesHelper = new THREE.AxesHelper( 5 );
		//scene1.add( axesHelper );

        scene1.add(pointLight);


	}

	// onMouseMove (e){
	// 	let vector 
	// 	//renderer1.getSize(vector)
		
	// 	mouse.x = (e.clientX/window.innerHeight) *2  - 1;
	// 	mouse.y = -(e.clientY/window.innerHeight)*2  + 1;
				
	// 	mouse = mouse.unproject(camera1)
	// 	let raycaster = new THREE.Raycaster(camera1.position, mouse.sub(camera1.position).normalize())
	// 	let intersects = raycaster.intersectObjects(scene1.children)
	// 	if (intersects.length > 0) {
	// 		if (intersects[0].object instanceof THREE.Mesh) {
	// 			//console.log(intersects[0].object)
	// 			//intersects[0].object.material.emissive.setHex(0xff0000)
	// 		}
					

			
	// 	}
	// 	//console.log(intersects)
	// }

	componentWillUnmount=() => {
		   while(scene1.children.length > 0){ 
			    scene1.remove(scene1.children[0]); 
			}
			while(group.children.length > 0){ 
			    group.remove(group.children[0]); 
			}
	}

	onMouseClick =()=>{
		console.log('clicking')
	}

	
	nail_shape_geom(name, color, texture, position, rotation, scale){

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
			//debugger
				 //mesh.rotation.z = Math.PI/2 
				// mesh.scale.set(0.005, 0.005, 0.005)
				 mesh.scale.set(scale, scale, scale)
				 mesh.rotation.set(rotation[0], rotation[1], rotation[2])
				 

				mesh.position.set(position[0], position[1], position[2])

				// if (name === "thumb"){
				//  	mesh.rotation.z = Math.PI/2
				//  	mesh.rotation.y = Math.PI/4

				//  	//mesh.rotation.x = 0.9
					
				// 	// var tween = new TWEEN.Tween(mesh.rotation)
			 //  //       .to({ z: [0, 1]}, 2000)
			 //  //       .repeat(Infinity)
			 //  //       .start();
				//  	//mesh.rotation.z = Math.PI/2 + Math.PI/4

				//  }


				mesh.material = new THREE.MeshPhongMaterial( );
				
				
				mesh.material.needsUpdate = true

				 
				 if (texture === "naked.png") {

				 	//mesh.material.color.setHex("0xFFFFFF")
				 	 let texture1 = THREE.ImageUtils.loadTexture(NakedNail) 
						 texture1.flipY = false;
					 
					 	texture1.offset.y = 1
					 	texture1.rotation = Math.PI/2
				 	mesh.material.map= texture1
				 	mesh.material.needsUpdate = true
				  	mesh.material.map.needsUpdate = true;

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
				//scene1.add(mesh);
				group.add(mesh);
				//console.log("adding mesh")
				//console.log(group.children.length)
				
				
			}
			
		);
		
		return mesh

		

	}

	riggedHand(){
		let loader = new GLTFLoader();
		let mesh;
		let color = new THREE.Color(flesh_color)

		loader.load(
			require('../RiggedHand2.glb'),
			function(gltf) {

				mesh = gltf.scene.children[0].children[1]
				// debugger
//LEAVE THAT - THAT S FOR SMOOTHNESS********************************************
				mesh.geometry = new THREE.Geometry().fromBufferGeometry( mesh.geometry );
			   mesh.geometry.mergeVertices();

			   mesh.geometry.computeVertexNormals();
			   mesh.geometry = new THREE.BufferGeometry().fromGeometry( mesh.geometry );
//********************************************************************************

				mesh.position.set(0.72, 0.15, -1.45)          // works for hand2!!!!

				mesh.material = new THREE.MeshLambertMaterial({color});
				
				//mesh.material.flatshading = THREE.SmoothShading;
				//var textureLoader = new THREE.TextureLoader();
				
				mesh.material.needsUpdate = true
				

				//scene1.add(mesh);
				group.add(mesh);
				//}
				 
	
				
	   });   //Loader
	

	}

	
	draw = () =>{
		//cleaning the scene
		//console.log("before cleaning")
		//console.log(group.children.length)
		
			while(group.children.length > 0){ 
			    group.remove(group.children[0]); 
			}


	 	let nail_group = new THREE.Group()


	 //	console.log("after cleaning")

	 //	console.log(group.children.length)

		let polish = this.props.currentPolish

	 	let color =  new THREE.Color(`rgb(${polish.red}, ${polish.green}, ${polish.blue})`);;
		
		//console.log(this.props.nails)


		 this.nail_shape_geom("pinky", 
													color, 
													this.props.nails.find(nail => nail.name === "left_pinky").texture, 
													[-0.056, 0.093, 0.0027],
													[0, 0, Math.PI/2 + 0.3], 
													0.0045
													);
		this.nail_shape_geom("ring", 
													color, 
													this.props.nails.find(nail => nail.name === "left_ring").texture, 
													[-0.03, 0.12, 0.0036],
													[0, 0, Math.PI/2 +0.1], 
													0.0058
													);
		
		this.nail_shape_geom("middle", 
													color, 
													this.props.nails.find(nail => nail.name === "left_middle").texture, 
													[-0.0043, 0.135, 0.0048],
													[0, 0, Math.PI/2 ], 
													0.0063
													);
		this.nail_shape_geom("index", 
													color, 
													this.props.nails.find(nail => nail.name === "left_index").texture, 
													[0.0269, 0.125, 0.0071],
													[0, 0, Math.PI/2 - 0.07], 
													0.0058
													);
		this.nail_shape_geom("thumb", 
							color, 
							this.props.nails.find(nail => nail.name === "left_thumb").texture, 
							[0.0758, 0.052, -0.00655],
							//[0, Math.PI/2 , Math.PI/2 +0],
							[37*Math.PI/180, 70*Math.PI/180, 50*Math.PI/180], 
							0.006
							);
		


		this.riggedHand()

		//console.log("filled group")

		//console.log(group.children.length)


		scene1.add(group)
		

		var tween = new TWEEN.Tween(group.rotation)
			        .to({ y: [0, 1.3, -1.5 ,0]}, 9000)
			        .repeat(Infinity)
			        .start();
		

	 	
		var animate = function () {
	      requestAnimationFrame( animate );

	       TWEEN.update();
			
	       renderer1.render( scene1, camera1 );
	    };
	    animate();
	 	
	 }



	render() {
		//console.log("in hand")
		//console.log(this.props.current_project)

		while(group.children.length > 0){ 
			    group.remove(group.children[0]); 
		}

		this.draw()
	    return(
	    	<div>
		        <div id="hand_div" className="hand" 
							        ref={ref => (this.mount = ref)} 
							        /*onMouseMove={this.onMouseMove}*/ 
							        onClick={this.onMouseClick}>
				</div>
				<div className="finger_chose_panel">
					<div className={this.props.current_finger === "pinky"?"finger_btn_chosen":"finger_btn"}
						 onClick={() =>this.props.onChoseFinger("pinky")} >
						<img src={this.props.nails[0].texture} alt=""/>
												</div>
					<div className={this.props.current_finger === "ring"?"finger_btn_chosen":"finger_btn"} onClick={() =>this.props.onChoseFinger("ring")} >
					<img src={this.props.nails[1].texture} alt=""/>
					</div>
					<div className={this.props.current_finger === "middle"?"finger_btn_chosen":"finger_btn"} onClick={() =>this.props.onChoseFinger("middle")} >
					<img src={this.props.nails[2].texture} alt=""/></div>
					<div className={this.props.current_finger === "index"?"finger_btn_chosen":"finger_btn"} onClick={() =>this.props.onChoseFinger("index")} >
					<img src={this.props.nails[3].texture} alt=""/></div>
					<div className={this.props.current_finger === "thumb"?"finger_btn_chosen":"finger_btn"} onClick={() =>this.props.onChoseFinger("thumb")} >
					<img src={this.props.nails[4].texture} alt=""/></div>
				</div>

	        </div>
		        		
	    )
	  }
}