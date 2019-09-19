import React from 'react';
import './App.css';
import PlateCanvas from "./containers/PlateCanvas"
import WorkingCanvas from "./containers/WorkingCanvas"

import PolishesShelf from "./containers/PolishesShelf"
import Hand from "./containers/Hand"

import Intro from "./containers/Intro"


const URL = "http://localhost:3000/"


export default class App extends React.Component{

	constructor() {
		super()
		//localStorage.clear()
		this.state = {
			polishCollection: [],
			nails: [],
			imgDataFromPlate:{},
			username:"",
			password:"",
			currentPolish:{},
			currentTexture: {},
		}
		
	}

	componentDidMount(){

	 	console.log(localStorage.token)
	 	if (localStorage.token){
	 		fetch(URL + "nails", {
        		method:"GET",
        		headers:{
        			Authorization: `Bearer ${localStorage.token}`
        		}
        	})
		      .then(res => res.json())
		      .then(res => {
		          console.log(res)
		            this.setState({nails: res})
		       })


	       fetch(URL + "polishes", {
        		method:"GET",
        		headers:{
        			Authorization: `Bearer ${localStorage.token}`
        		}
        	})
		      .then(res => res.json())
		      .then(res => {
		          console.log(res)
		            this.setState({polishCollection: res})
		    })

	 	}

	}

	handleGetImgDataFromPlate =(imgData) =>{
		this.setState({imgDataFromPlate: imgData}, console.log(imgData))
	}

	handleAuth =(auth)=>{
		console.log(auth)
		this.setState({username:auth.username, password:auth.password})
		fetch(URL + "login", {
			method:"POST",
			headers:{
				"Content-Type": "application/json"
			},
			body:JSON.stringify({
				username: auth.username,
				password: auth.password
			})
		})
		.then(res => res.json())
        .then(data => {
        	localStorage.setItem("token", data.token)
        	this.setState({username:data.username})


			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//reading nails
			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        	fetch(URL + "nails", {
        		method:"GET",
        		headers:{
        			Authorization: `Bearer ${localStorage.token}`
        		}
        	})
		      .then(res => res.json())
		      .then(res => {
		          console.log(res)
		            this.setState({nails: res})
		       })
			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//reading polishes
			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	       fetch(URL + "polishes", {
        		method:"GET",
        		headers:{
        			Authorization: `Bearer ${localStorage.token}`
        		}
        	})
		      .then(res => res.json())
		      .then(res => {
		          console.log(res)
		          this.setState({polishCollection: res, currentPolish:res[0]})
		    })
        }) // login fetch
	}

	handleLogout = () =>{
		this.setState({username:"", password:""})
		localStorage.clear()

	}

	handlePickColor = (polish) =>{
		//console.log(polish)
		this.setState({currentPolish:polish})
	}
	handlePickTexture = (texture) =>{
		console.log(texture)
		this.setState({currentTexture:texture})
	}

	render() {
		//console.log(localStorage)
	  return (
	    <div className="App">

	    {localStorage.length === 0? 
		    <Intro handleAuth={this.handleAuth}/>
	    	:
	    	<div>
	    		<div className="Logout" onClick={this.handleLogout}>Log out!</div>
				<PlateCanvas text = {"some text"} handleGetImgDataFromPlate = {this.handleGetImgDataFromPlate}/>   
				<PolishesShelf polishCollection={this.state.polishCollection}
								handlePickColor = {this.handlePickColor}/>
			    <Hand nails={this.state.nails} 
			    				currentPolish={this.state.currentPolish}
			    				currentTexture = {this.state.currentTexture}/>
			    <WorkingCanvas nails={this.state.nails} imgData = {this.state.imgDataFromPlate}
			    				currentPolish = {this.state.currentPolish}
			    				handlePickTexture={this.handlePickTexture}
			    				/>
		    </div>
		}
	      
	    </div>
	  );
	}
}



