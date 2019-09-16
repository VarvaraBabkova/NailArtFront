import React from 'react';
import ReactDOM from "react-dom";
import * as THREE from "three";

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
        scene1.add(pointLight);
	}

	 draw(){
	 	let color =  new THREE.Color("rgb(255, 0, 0)");;
	 	const geometry = new THREE.BoxGeometry( 2, 2, 2 );
		    let material = new THREE.MeshLambertMaterial( {color} );
		    let cube = new THREE.Mesh( geometry, material );

		    scene1.add(cube)
		var animate = function () {
	      requestAnimationFrame( animate );
	     cube.rotation.x += 0.01; 
	     cube.rotation.y += 0.01;
	      renderer1.render( scene1, camera1 );
	    };
	    animate();
	 	
	 }


	render() {
		console.log("in hand " )
		console.log(this.props.polishCollection)
		this.draw()
	    return(
	        <div className="hand" ref={ref => (this.mount = ref)} />

		        		
	    )
	  }
}