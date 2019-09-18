import React from 'react';
//import ReactDOM from "react-dom";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, (window.innerWidth)/(window.innerHeight), 1, 1000 );
const renderer = new THREE.WebGLRenderer();



export default class Intro extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			username:"",
			password:"",
			balls:[],
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

	componentDidMount() {
	   
	    renderer.setSize( window.innerWidth, window.innerHeight);
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

	    let balls = []

	    for (var i = 0; i < 5; i++) {

	    	let polish = {red: Math.floor(Math.random() * 100) + 150, 
	    		green: Math.floor(Math.random() * 100) + 150, 
	    		blue:Math.floor(Math.random() * 100) + 150}

	    	let geometry = new THREE.SphereGeometry(Math.random(), 20, 20);

		    let material = new THREE.MeshLambertMaterial( 
		    	new THREE.Color(`rgb(${polish.red}, ${polish.green}, ${polish.blue})`));
	   
	    	let ball  = new THREE.Mesh( geometry, material );
	    	

			ball.material.color.setStyle(`rgb(${polish.red}, ${polish.green}, ${polish.blue})`)
			//geometry.colorsNeedUpdate = true
			ball.position.set(i ,i, 0)
			material.specular = new THREE.Color("rgb(250, 250, 250)")
		    material.shininess = 10;
			scene.add( ball );
			balls.push(ball)
	    }
	   
	    this.setState({balls: balls})
	   	renderer.render( scene, camera );


	 }

	  draw(){
	 	
		    
	 	
	 	


	    var animate = function () {
	      requestAnimationFrame( animate );
	      if (this.state.balls[0]) {
	      	this.state.balls.map(ball => {
	      		ball.rotation.x += 0.001; 
	      		ball.rotation.y += 0.001;
	      	})
	      
	      }
	     
	      renderer.render( scene, camera );
	    };
	    animate();
	 }

	render() {
		// console.log("in intro " )
		// console.log(this.state.balls)
	// this.draw()
	    return(
	        <div className="intro" ref={ref => (this.mount = ref)} >
	        	 <form className="loginForm"  onSubmit={e => this.preHandle(e)}>
					<div>
                      <label>
                        Username
                        <input id="username" name="username" type="text" 
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
	        </div>
	       
		        		
		        	 
	        	
	    )
	  }
}
 