import React from 'react';
//import ReactDOM from "react-dom";
import * as THREE from "three";
import GLTFLoader from 'three-gltf-loader';
import TWEEN from '@tweenjs/tween.js';
import Projects from "./Projects"




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, (window.innerWidth)/(window.innerHeight), 1, 1000 );
const renderer = new THREE.WebGLRenderer({ antialias: true });



export default class Intro extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			username:"admin",
			password:"qqq",
			
		}
	}

	handleUserInputChange = (event) =>{
		this.setState({username: event.target.value})
	}

	handlePassInputChange= (event) => {
		this.setState({password: event.target.value})

	}

	preHandle =(e) =>{
		console.log(this.state)
		e.preventDefault()
		
       //  this.setState({username:"", password:"", form_button:"Log out"})
		this.props.handleAuth({username: this.state.username, password: this.state.password})
	}

	drawPolish = (position, rotation = {x:0, y:0, z:0}) =>{
		let loader = new GLTFLoader();
			let mesh;
			let color = "rgb(255, 255, 255)"
			loader.load(
				require('../polish1.glb'),
				function(gltf) {
					 mesh = gltf.scene.children[0]
	//LEAVE THAT - THAT S FOR SMOOTHNESS********************************************
					 mesh.geometry = new THREE.Geometry().fromBufferGeometry( mesh.geometry );
				    mesh.geometry.mergeVertices();
				    mesh.geometry.computeVertexNormals();
				    mesh.geometry = new THREE.BufferGeometry().fromGeometry( mesh.geometry );
	//********************************************************************************
				 // mesh.rotation.y = -Math.PI 
				   	
				   	//mesh.rotation.x = -Math.PI /2
					mesh.rotation.set(rotation.x-Math.PI /2, rotation.y, rotation.z) 

					 let scale = 0.2
					 mesh.scale.set(scale, scale, scale)

					mesh.position.set(position.x, position.y, position.z)

					 mesh.material = new THREE.MeshPhongMaterial( new THREE.Color( 'white' ) );
					  mesh.material.flatShading = false

					// mesh.geometry.computeBoundingBox()
					 mesh.geometry.verticesNeedUpdate = true
					
					mesh.material.needsUpdate = true
					
					scene.add(mesh);
								
						

	 	 		})//load
	}

	componentDidMount() {


	    renderer.setSize( window.innerWidth, window.innerHeight);
	    // document.body.appendChild( renderer.domElement );
	     this.mount.appendChild( renderer.domElement );
	     scene.background = new THREE.Color( 'white' );
	     
	    camera.position.z = 5;
	    camera.position.y = 1;
	    camera.position.x = 2;


	    // let pointLight =
     //      new THREE.PointLight(0xFFFAFF);

     //    // set its position
     //    pointLight.position.x = 5;
     //    pointLight.position.y = 10;
     //    pointLight.position.z = 13;

        // add to the scene
        //scene.add(pointLight);

         let spotLight =
          new THREE.SpotLight(0xFFFFFF);

        // set its position
        spotLight.position.set( 20, 10, 20 );

		spotLight.castShadow = true;

		spotLight.shadow.mapSize.width = 1024;
		spotLight.shadow.mapSize.height = 1024;

		spotLight.shadow.camera.near = 500;
		spotLight.shadow.camera.far = 4000;
		spotLight.shadow.camera.fov = 30;

        scene.add(spotLight);

       let ambientLight =
          new THREE.AmbientLight(0xFFFFFF);

        ambientLight.intensity = 0.15
        scene.add(ambientLight);

        let axesHelper = new THREE.AxesHelper( 5 );
		//scene.add( axesHelper );

	   	let geometry = new THREE.CubeGeometry(0.5,0.5,0.5);

		let material = new THREE.MeshPhongMaterial(new THREE.Color("rgb(255, 255, 255"));
	    material.specular = new THREE.Color("rgb(250, 250, 250)")
		material.shininess = 20;

	  	let cube1  = new THREE.Mesh( geometry, material );
	  	//cube1.scale.set(1.2, 1, 1)

	    scene.add( cube1 );

		let cube2  = new THREE.Mesh( geometry, material );
		cube2.position.set(0.8, 0, 0)
		//cube2.scale.set(1, 2, 1)
	    scene.add( cube2 );

	    let cube3  = new THREE.Mesh( geometry, material );
	    cube3.position.set(2, 0, 0)

	   	let plane_geometry_back = new THREE.PlaneGeometry( 6, 6);
	  	let plane_back  = new THREE.Mesh( plane_geometry_back, material );
	  	//plane.rotation.x = Math.PI/4
	  	plane_back.position.set( 0.5, 1, -1)
	  	scene.add(plane_back)

		let plane_geometry_left = new THREE.PlaneGeometry( 6, 6);
	  	let plane_left  = new THREE.Mesh( plane_geometry_left, 
	  						new THREE.MeshPhongMaterial(new THREE.Color("rgb(255, 255, 20")));
	  	plane_left.rotation.x = 80*Math.PI/180

	  	plane_left.position.set( 0.5, -0.5, -1)
	  	scene.add(plane_left)

	  	this.drawPolish({x:0, y:0.4, z:0})
	   	this.drawPolish({x:0.8, y:0.4, z:0})
	   	this.drawPolish({x:0.0, y:0.0, z:0.9})

	   	this.drawPolish({x:2, y:0, z:0.5}, {x:0, y:0, z: 0})
	   	this.drawPolish({x:1.5, y:0, z:0.7}, {x:0, y:0, z: 0})

		 //this._input.focus();
	 }

	 componentWillUnmount() {
		   while(scene.children.length > 0){ 
			    scene.remove(scene.children[0]); 
			}
		   // window.cancelAnimationFrame(this.requestID);
		  }

	 draw(){
	 	
		 //scene.remove.apply(scene, scene.children.filter(child => child instanceof THREE.Mesh));

	 	
	 	

	    //scene.add( cube3 );

		


	   	if (this.props.state === "Intro_rejected") {
	   		let tween = new TWEEN.Tween(scene.rotation)
			        .to({ y: [0, 0.03, 0, -0.03, 0]}, 500)
			        .repeat(1)
			        .start();

			 this.props.handleChangeState("Intro_first")
	   	}

	   	if (this.props.state === "Entered") {

	   		 scene.children.map(child => (child instanceof THREE.Mesh && child.name === "Cylinder"?
	   		 	child.material.color.setHex(0xaaffff)
	   		 	:child
	   		 	))
	   		// 		   		child.material.color.setHex(0xff0000):child.material.color.setHex(0xff0000)))

	   		// cube2.material.color.setHex(0xff0000);

	   		let tween = new TWEEN.Tween(scene.rotation)
			        .to({ x: [0, 0.05, 0, -0.05, 0]}, 500)
			        .repeat(2)
			        .start();

			 console.log(scene)
			 this.props.handleChangeState("Projects")

	   	}
	   	
if (this.props.state === "Projects") {

	   		 scene.children.map(child => (child instanceof THREE.Mesh && child.name === "Cylinder"?
	   		 	child.material.color.setHex(0xaaffff)
	   		 	:child
	   		 	))
	   		// 		   		child.material.color.setHex(0xff0000):child.material.color.setHex(0xff0000)))

	   		// cube2.material.color.setHex(0xff0000);

	   		// let tween = new TWEEN.Tween(cube2.rotation)
			   //      .to({ z: [0, 0.05, 0, -0.05, 0]}, 500)
			   //      .repeat(10)
			   //      .start();

			

	   	}
	   	

	   	renderer.render( scene, camera );



	    var animate = function () {
	      requestAnimationFrame( animate );
	      
	      
	       TWEEN.update();
	     	     
	      renderer.render( scene, camera );
	    };
	    animate();
	 }

	render() {
		// console.log("in intro " )
		// console.log(this.state.balls)
		console.log(this.props.state)
	 	this.draw()
	    return(
	        <div className="intro" ref={ref => (this.mount = ref)} >
	        	 


	        	 {(this.props.state === "Projects")?
	        	 <Projects handlePickProject={this.props.handlePickProject} projects= {this.props.projects}/>
	        	 :
	        	 <form className="loginForm "  onSubmit={e => this.preHandle(e)}>
					<div>
                      <label>
                        Username
                        <input id="username" name="username" type="text"  ref={c => (this._input = c)} 
                        onChange={this.handleUserInputChange} value={this.state.username}/>
                      </label>
                    </div>
                    <div>
                      <label>
                        Password
                        <input id="password" name="password" type="password" 
                        onChange={this.handlePassInputChange} value={this.state.password}/>
                      </label>
                    </div>
                    <div>
                      <button type="submit">Log in</button>
                    </div>
	        	 </form>
	        	}
	        </div>
	       
		        		
		        	 
	        	
	    )
	  }
}
 