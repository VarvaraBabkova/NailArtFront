import React from 'react';
import * as THREE from "three";
import GLTFLoader from 'three-gltf-loader';


const scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera( 40, (window.innerWidth)/(window.innerHeight/4), 1, 1000 );

const camera = new THREE.OrthographicCamera( -10, 10, 10/8, -10/8 ,1, 50 );

var aspect = window.innerWidth / window.innerHeight;
var frustumSize = 6;
// const camera = new THREE.OrthographicCamera(0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, 
// 										frustumSize / 2, frustumSize / - 2, 1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true });



class PolishesShelf extends React.Component {

	componentDidMount() {
	   
	   	renderer.setClearColor(new THREE.Color( 'white' ))
	    renderer.setSize( window.innerWidth, window.innerHeight/4 );
	     this.mount.appendChild( renderer.domElement );
	     scene.background = new THREE.Color( 'white' );
	     
	    // camera.lookAt(-20, 20, -20)
	    // camera.position.set(0, 0, 20)

	    camera.up.set(0,-1,0)
		camera.lookAt(0, 5, 0.2)
	    camera.position.set(0, -5, 0.7)

	    //camera.updateProjectionMatrix();
	    camera.zoom = 0.8

		// let helper = new THREE.CameraHelper( camera );
		// scene.add( helper );
		scene.add(camera)


		//TABLE *************************************************************
		let plane = new THREE.Mesh(new THREE.PlaneGeometry(60,2),
								   new THREE.MeshStandardMaterial({color: 0xAAFFFF}))
		// plane.material.specular = new THREE.Color("rgb(250, 250, 250)")
		plane.material.metalness = 0.9;
		plane.material.roughness = 0.0;

		plane.position.set(0, 0, -0.5)
		scene.add(plane)

	    //LIGHT ****************************************************************

	    let pointLight =
          new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 50;
        pointLight.position.y =-80;
        pointLight.position.z = 20;

        // add to the scene
        scene.add(pointLight);

	    var axesHelper = new THREE.AxesHelper( 50 );
		scene.add( axesHelper );

	 }
	  componentWillUnmount() {
		   while(scene.children.length > 0){ 
			    scene.remove(scene.children[0]); 
			}
		  }
	
	draw(){
	 	
		// scene.remove.apply(scene, scene.children.filter(child => child instanceof THREE.Mesh));

		let bottles = []
	 	if (this.props.polishCollection[0]) {
	  		this.props.polishCollection.map((polish, index) => {
	 			let color = new THREE.Color(`rgb(${polish.red}, ${polish.green}, ${polish.blue})`)
	 		

			let loader = new GLTFLoader();
			let mesh;

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
				//	  mesh.rotation.x = -Math.PI+0.01 
					//  mesh.rotation.z = -Math.PI
					 let scale = 0.6
					 mesh.scale.set(scale, scale, scale)

				 mesh.position.set((index - 5.5)*1.5, 0, 0)
				//	mesh.position.set(0,0,0)

					 mesh.material = new THREE.MeshPhongMaterial( {color} );
					 mesh.material.flatShading = false

					mesh.geometry.computeBoundingBox()
					mesh.geometry.verticesNeedUpdate = true
					
					mesh.material.needsUpdate = true
					

					scene.add(mesh);
								
						

	 	 		})//load
	  		})//map
	 		
		}//if
	 	
	 	renderer.render( scene, camera);
	   
	 }

	render() {
		// console.log("in shelf " )
		// console.log(this.props.polishCollection)
		 this.draw()
	    return(
	        <div className="polishesShelf" ref={ref => (this.mount = ref)} >
	        	{
	        		this.props.polishCollection.map((polish, index) => {
	        			let buttonClassName = "color_button " + index 
	        			return(<button key = {index} className={buttonClassName}
	        				onClick = {() => this.props.handlePickColor(polish)} >
	        				{polish.name} 
	        				</button>)
	        		})
	        	}

	        </div>

		        		
		        	 
	        	
	    )
	  }
}
export default PolishesShelf



