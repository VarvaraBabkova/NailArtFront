import React from 'react';
//import ReactDOM from "react-dom";
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
	 	const geometry = new THREE.DodecahedronGeometry( 1, 0 );
		    let material = new THREE.MeshLambertMaterial( {color} );
		    let nails = []// = new THREE.Mesh( geometry, material );

scene1.remove.apply(scene1, scene1.children.filter(child => child instanceof THREE.Mesh));
	console.log(scene1.children)

		if (this.props.nails[0]) {

	 		this.props.nails.map((nail, index) => {
			    let material = new THREE.MeshPhongMaterial( {color} );
			     nails[index] = new THREE.Mesh( geometry, material );
			     let polish = nail.polishes[0]
				nails[index].material.color.setStyle(`rgb(${polish.red}, ${polish.green}, ${polish.blue})`)
				geometry.colorsNeedUpdate = true
				nails[index].position.set( -4 + index*2.7, (index == 4)?-2:2, 0)
				scene1.add( nails[index] );
	 		})
	 		
	 		
			
	 	} 

		  // scene1.add(nail)
		var animate = function () {
	      requestAnimationFrame( animate );
	      nails.map(nail =>{
	      	nail.rotation.x += 0.01; 
		     nail.rotation.y += 0.01;
	      })
	     
	      renderer1.render( scene1, camera1 );
	    };
	    animate();
	 	
	 }


	render() {
		console.log("in hand " )
		console.log(this.props.nails)
		this.draw()
	    return(
	        <div className="hand" ref={ref => (this.mount = ref)} />

		        		
	    )
	  }
}