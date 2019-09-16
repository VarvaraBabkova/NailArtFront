import React from 'react';
import ReactDOM from "react-dom";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, (window.innerWidth/12)/(window.innerHeight/4), 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();


export default class Polish extends React.Component {


	componentDidMount() {
	   
	    renderer.setSize( window.innerWidth/12, window.innerHeight/4 );
	    // document.body.appendChild( renderer.domElement );
	     this.mount.appendChild( renderer.domElement );
	     scene.background = new THREE.Color( 'white' );
	     
	    camera.position.z = 5;

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
		    var material = new THREE.MeshLambertMaterial( {color} );
		    var cube = new THREE.Mesh( geometry, material );
		    
	 	if (this.props.polish) {
	 		
			 cube.material.color.setStyle(`rgb(${this.props.polish.red}, ${this.props.polish.green}, ${this.props.polish.blue})`)
				geometry.colorsNeedUpdate = true
				scene.add( cube );
			 console.log(this.props.offset)
	 	} 
	 	
	    var animate = function () {
	      requestAnimationFrame( animate );
	      cube.rotation.x += 0.01;
	      cube.rotation.y += 0.01;
	      renderer.render( scene, camera );
	    };
	    animate();
	 }

	render() {
		console.log("in polish " )
		console.log(this.props.polish)
		console.log(this.props.offset)
		this.draw()
	    return(
	    	<div>
	        <div className={this.props.className}  ref={ref => (this.mount = ref)} />

	        </div>
	    )
	  }
}


