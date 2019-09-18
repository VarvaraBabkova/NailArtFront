import React from 'react';
//import ReactDOM from "react-dom";
import * as THREE from "three";
import GLTFLoader from 'three-gltf-loader';


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
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        // add to the scene
		var axesHelper = new THREE.AxesHelper( 5 );
		scene1.add( axesHelper );
        scene1.add(pointLight);
	}

	nail_shape_geom(color){

		let loader = new GLTFLoader();
		let mesh, mesh1;

		loader.load(
			require('../nail2.glb'),
			function(gltf) {
				console.log("gltf")
				console.log(gltf)
				console.log(gltf.scene.children)

	
				 mesh = gltf.scene.children[0]

				  mesh.geometry = new THREE.Geometry().fromBufferGeometry( mesh.geometry );
			    mesh.geometry.mergeVertices();
			    mesh.geometry.computeVertexNormals();
			    // convert back to BufferGeometry prior to rendering
			    mesh.geometry = new THREE.BufferGeometry().fromGeometry( mesh.geometry );

				 mesh.rotation.x = Math.PI 
				//  mesh.rotation.y = Math.PI / 3
				 mesh.position.set(0, 0, 3)
				mesh.material = new THREE.MeshLambertMaterial( {color} );
				console.log(mesh.material)
				mesh.material.flatshading = THREE.SmoothShading;

				scene1.add(mesh);
				//   let mesh1 = JSON.parse(JSON.stringify(mesh));
				//   //console.log(mesh1)

				//   mesh1.position.set(1, 0, 3)
				

				// scene1.add(mesh1);
				
				
			}
		);
		
		return mesh

		

	}
	nail_shape_geom_primitive(){
		var shape = new THREE.Shape();
		shape.moveTo( 0,0 );
		shape.bezierCurveTo(0.2, 0.5, 1.8, 0.5, 2, 0);
		

		var extrudeSettings = {
			amount: 2,
			beveThickness:0.01,
			 bevelEnabled: false,
			 bevelSize: 0.01,
			 bevelSegments:2,
		
		};

	 	let geom = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	 	return geom
	}

	draw(){
		//cleaning the scene
	 	scene1.remove.apply(scene1, scene1.children.filter(child => child instanceof THREE.Mesh));
		console.log(scene1.children)

	 	let color =  new THREE.Color("rgb(255, 0, 0)");;
		let material = new THREE.MeshLambertMaterial( {color} );
		let nails = []

		
		let nail_shape = this.nail_shape_geom(color);
		console.log("in draw after")
		console.log(nail_shape)

		//nail_shape.material = material
		//let nail_shape = this.nail_shape_geom(color)
		
		// scene1.add( nail_shape );
		// nails.push(nail_shape)
			// if (this.props.nails[0]) {

		 // 		this.props.nails.map((nail, index) => {
			// 	    let material = new THREE.MeshPhongMaterial( {color} );
			// 	     nails[index] = new THREE.Mesh( this.nail_shape_geom(color), material );
			// 	     let polish = nail.polishes[0]
			// 		nails[index].material.color.setStyle(`rgb(${polish.red}, ${polish.green}, ${polish.blue})`)
			// 		geometry.colorsNeedUpdate = true
			// 		//nails[index].position.set( -6 + index*2.7, (index == 4)?-2:2, -1)
			// 		scene1.add( nails[index] );
		 // 		})
	 	// 	} 

	console.log("in draw")
		console.log(nails)

	 	let flag = true
		var animate = function () {
	      requestAnimationFrame( animate );
	      
	      
	      nails.map(nail =>{

	      
	  //     	if (nail.rotation._x <= 1.9 && flag) {
	  //     		nail.rotation.x += 0.01; 
	      		
	  //     	}
			// if(nail.rotation._x  >= 1.9)
			// 	flag = false;
			// if(nail.rotation._x  <= 0.7)
			// 	flag = true;

	  //      if (nail.rotation._x >= 0.7 && !flag){
	  //      	 	nail.rotation.x -= 0.01; 
	  //      }
	      	
	      })
	     
	      renderer1.render( scene1, camera1 );
	    };
	    animate();
	 	
	 }


	render() {
		// console.log("in hand " )
		// console.log(this.props.nails)
		this.draw()
	    return(
	        <div className="hand" ref={ref => (this.mount = ref)} />

		        		
	    )
	  }
}