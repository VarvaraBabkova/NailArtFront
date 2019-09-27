import React from 'react';
import * as THREE from "three";
import GLTFLoader from 'three-gltf-loader';


const polishes_scene = new THREE.Scene();
//const camera = new THREE.PerspectiveCamera( 40, (window.innerWidth)/(window.innerHeight/4), 1, 1000 );

const polishes_camera = new THREE.OrthographicCamera( -10, 10, 10/8, -10/8 ,1, 50 );

//var aspect = window.innerWidth / window.innerHeight;


// const camera = new THREE.OrthographicCamera(0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, 
// 										frustumSize / 2, frustumSize / - 2, 1, 100);

const polishes_renderer = new THREE.WebGLRenderer({ antialias: true });




export default class PolishesShelf extends React.Component {

	componentDidMount() {
	   
	 //   	polishes_renderer.setClearColor(new THREE.Color( {color: 0xEEEEEE} ))
	 //    polishes_renderer.setSize( window.innerWidth*0.8, 0.8*window.innerHeight/4 );

	 //     this.mount.appendChild( polishes_renderer.domElement );

	 //     polishes_scene.background = new THREE.Color( {color: 0xEEEEEE} );
	     
	 //    // camera.lookAt(-20, 20, -20)
	 //    // camera.position.set(0, 0, 20)

	 //    //polishes_camera.up.set(0,-1,0)
		// polishes_camera.lookAt(0, 5, 0.2)
	 //    polishes_camera.position.set(0, -5, 0.7)

	 //    //polishes_camera.updateProjectionMatrix();
	 //   polishes_camera.zoom = 1

		// let helper = new THREE.CameraHelper( polishes_camera );
		//  polishes_scene.add( helper );
		// polishes_scene.add(polishes_camera)


	 //    //LIGHT ****************************************************************

	 //    let pointLight =
  //         new THREE.PointLight(0xFFFFFF);

  //       // set its position
  //       pointLight.position.x = 50;
  //       pointLight.position.y =-80;
  //       pointLight.position.z = 20;

  //       // add to the scene
  //       polishes_scene.add(pointLight);

	 //    var axesHelper = new THREE.AxesHelper( 50 );
		// polishes_scene.add( axesHelper );


		// polishes_renderer.render( polishes_scene, polishes_camera);

		// this.draw()

	 }


  componentWillUnmount() {
	   while(polishes_scene.children.length > 0){ 
		    polishes_scene.remove(polishes_scene.children[0]); 
		}
	  }
	
	draw(){
	 	//polishes_camera.up.set(0,1,0)
	    polishes_camera.updateProjectionMatrix();

		//polishes_scene.remove.apply(polishes_scene,
		//polishes_scene.children.filter(child => child instanceof THREE.Mesh));
		
		let helper = new THREE.CameraHelper( polishes_camera );
		 polishes_scene.add( helper );

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
				
					 let scale = 0.3
					 mesh.scale.set(scale, scale, scale)

				 	mesh.position.set((index - 5.5)*1.5, 0, 0)
				//	mesh.position.set(0,0,0)

					 mesh.material = new THREE.MeshPhongMaterial( {color} );
					 mesh.material.flatShading = false

					mesh.geometry.computeBoundingBox()
					mesh.geometry.verticesNeedUpdate = true
					
					mesh.material.needsUpdate = true
					

					polishes_scene.add(mesh);
								
						

	 	 		})//load
	  		})//map
	 		
		}//if
	 	
	 	polishes_renderer.render( polishes_scene, polishes_camera);
	   
	 }

	render() {
		// console.log("in shelf " )
		// console.log(this.props.polishCollection)
		this.draw()
	    return(
	    
	    	<div>

	        	{
	    	    		//<div className="polishesShelf" ref={ref => (this.mount = ref)} ></div>

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


