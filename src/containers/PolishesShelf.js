import React from 'react';
//import ReactDOM from "react-dom";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, (window.innerWidth)/(window.innerHeight/4), 1, 1000 );
const renderer = new THREE.WebGLRenderer();



class PolishesShelf extends React.Component {
	componentDidMount() {
	   
	    renderer.setSize( window.innerWidth, window.innerHeight/4 );
	    // document.body.appendChild( renderer.domElement );
	     this.mount.appendChild( renderer.domElement );
	     scene.background = new THREE.Color( 'white' );
	     
	    camera.position.z = 10;

	    let pointLight =
          new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 0;
        pointLight.position.y = 100;
        pointLight.position.z = 130;

        // add to the scene
        scene.add(pointLight);

	    

	 }
	  draw(){
	 	
		   
		let bottles  = []//= new THREE.Mesh( geometry, material );

	 	if (this.props.polishCollection[0]) {
	 		this.props.polishCollection.map((polish, index) => {
	 			let color = new THREE.Color(`rgb(${polish.red}, ${polish.green}, ${polish.blue})`)
	 			let geometry = new THREE.CylinderGeometry( 1.2, 1.3, 3, 20 );

		   // let material = new THREE.MeshPhongMaterial( {color} );
			    let material = new THREE.MeshPhongMaterial( {color} );
			     bottles[index] = new THREE.Mesh( geometry, material );
				bottles[index].material.color.setStyle(`rgb(${polish.red}, ${polish.green}, ${polish.blue})`)
				geometry.colorsNeedUpdate = true
				bottles[index].position.set(-15 + index*2.9, 0, 0)
				 material.specular = new THREE.Color("rgb(250, 250, 250)")
			    material.shininess = 10;
				scene.add( bottles[index] );
	 		})
	 		
	 		
			
	 	} 
	 	
	    var animate = function () {
	      requestAnimationFrame( animate );
	      if (bottles[0]) {
	      	bottles.map(bottle => {
	      		//cube.rotation.x += 0.001; 
	      		bottle.rotation.y += 0.01;
	      	})
	      
	      }
	     
	      renderer.render( scene, camera );
	    };
	    animate();
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



