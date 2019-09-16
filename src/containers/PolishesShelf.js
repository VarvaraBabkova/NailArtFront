import React from 'react';
import ReactDOM from "react-dom";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, (window.innerWidth)/(window.innerHeight/4), 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();



class PolishesShelf extends React.Component {
	componentDidMount() {
	   
	    renderer.setSize( window.innerWidth, window.innerHeight/4 );
	    // document.body.appendChild( renderer.domElement );
	     this.mount.appendChild( renderer.domElement );
	     scene.background = new THREE.Color( 'white' );
	     
	    camera.position.z = 7;

	    let pointLight =
          new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        // add to the scene
        scene.add(pointLight);

	    

	 }
	  draw(){
	 	let color;
	 	const geometry = new THREE.BoxGeometry( 2, 2, 2 );
		    let material = new THREE.MeshLambertMaterial( {color} );
		    let cubes  = []//= new THREE.Mesh( geometry, material );

	 	if (this.props.polishCollection[0]) {

	 		this.props.polishCollection.map((polish, index) => {
			    let material = new THREE.MeshLambertMaterial( {color} );
			     cubes[index] = new THREE.Mesh( geometry, material );
				cubes[index].material.color.setStyle(`rgb(${polish.red}, ${polish.green}, ${polish.blue})`)
				geometry.colorsNeedUpdate = true
				cubes[index].position.set(-15 + index*2.5, 0, 0)
				scene.add( cubes[index] );
	 		})
	 		
	 		//let polish = this.props.polishCollection[0]

	 		
			
	 	} 
	 	
	    var animate = function () {
	      requestAnimationFrame( animate );
	      if (cubes[0]) {
	      	//cubes.map(cube => {cube.rotation.x += 0.001; cube.rotation.y += 0.001;})
	      
	      }
	     
	      renderer.render( scene, camera );
	    };
	    animate();
	 }

	render() {
		console.log("in shelf " )
		console.log(this.props.polishCollection)
		 this.draw()
	    return(
	        <div className="polishesShelf" ref={ref => (this.mount = ref)} />

		        		
		        	 
	        	
	    )
	  }
}
export default PolishesShelf



