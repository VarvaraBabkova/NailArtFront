import React from 'react';
import './App.css';
import PlateCanvas from "./containers/PlateCanvas"
import WorkingCanvas from "./containers/WorkingCanvas"

import PolishesShelf from "./containers/PolishesShelf"
import StampingPolishes from "./containers/StampingPolishes"

import Hand from "./containers/Hand"

import Intro from "./containers/Intro"
import Projects from "./containers/Projects"
import { saveAs } from 'file-saver';


const URL = "http://localhost:3000/"
const white_polish = {red:255, green:255, blue:255}


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
			currentStampingPolish: {},
			page: "Intro",
			projects:[],
			user_id:0,
			current_project: {},
			current_finger:"index",
		}
		
	}


	readProjects(user_id){
		 //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//reading projects
			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        	fetch(URL + `users/${user_id}`, {
        		method:"GET",
        		headers:{
        			Authorization: `Bearer ${localStorage.token}`
        		}
        	})
		      .then(res => res.json())
		      .then(res => {
		      	  console.log("Projects")
		          console.log(res)
		           this.setState({projects: res.projects})
		       })


	}
	componentDidMount(){

	 	console.log(localStorage.token)
	 	if (localStorage.token){
	 		this.setState({ page:"Projects", user_id:localStorage.id})
		    this.readProjects(localStorage.id)


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
		      .catch(function() {
			        console.log("error");
			        localStorage.clear()
			    });

	 	}
	 	this.setState({currentStampingPolish: white_polish})

	 	let empty_nails = [{name: "left_pinky", texture: "naked.png"}, 
								{name: "left_ring", texture: "naked.png"}, 
								{name: "left_middle", texture: "naked.png"}, 
								{name: "left_index", texture: "naked.png"}, 
								{name: "left_thumb", texture: "naked.png"}]
		let empty_project = {name: "untitled", user_id: this.state.user_id, nails: empty_nails}
		this.setState({current_project: empty_project})


	}

	handleGetImgDataFromPlate =(imgData) =>{
		this.setState({imgDataFromPlate: imgData}, console.log(imgData))
	}

	handleAuth =(auth)=>{
		console.log(auth)
		let user_id 
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
        	//console.log(data)
        	localStorage.setItem("token", data.token)
        	localStorage.setItem("id", data.user_id)
        	this.setState({username:data.username, page:"Projects", user_id:data.user_id})
        	user_id = data.user_id

			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//reading nails
			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // 	fetch(URL + "nails", {
        // 		method:"GET",
        // 		headers:{
        // 			Authorization: `Bearer ${localStorage.token}`
        // 		}
        // 	})
		      // .then(res => res.json())
		      // .then(res => {
		      //     //console.log(res)
		      //       this.setState({nails: res})
		      //  })
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
		         // console.log(res)
		          this.setState({polishCollection: res, currentPolish:res[0]})
		    })

		    this.readProjects(user_id)


        }) // login fetch
	}

	handleLogout = () =>{
		this.setState({username:"", password:"", page:"Intro"})
		localStorage.clear()

	}

	handlePickColor = (polish) =>{
		//console.log(polish)
		this.setState({currentPolish:polish})
	}

	handlePickStampingColor = (st_polish) =>{
		console.log(st_polish)
		this.setState({currentStampingPolish:st_polish})
	}


	handlePickTexture = (texture, canvas) =>{
		console.log(canvas.toDataURL());

			let nails = this.state.current_project.nails
			let the_nail = nails.find(nail => nail.name === "left_" + this.state.current_finger)
			the_nail.texture = canvas.toDataURL()
			let cp = this.state.current_project
			cp.nails = nails

			this.setState({current_project: cp})

			console.log(nails)

		  //canvas.toBlob(function(blob){
		     //  saveAs(blob, "http://localhost:3001//pretty_image.png");

		 	//let nails = this.state.current_project.nails
		 	

			// fetch(URL + "nails", {
			// 	method:"POST",
			// 	headers:{
			// 		"Content-Type": "application/json",
			// 		"Authorization": `Bearer ${localStorage.token}`
			// 	},
			// 	body:JSON.stringify({
			// 		name: "left_pinky__________",
			// 		texture: canvas.toDataURL(),
			// 		project_id: 1
			// 	})
			// })
			// .then(res => res.json())
	  //       .then(data => console.log(data))
			 
			
		 //},'image/png');



		//this.setState({currentTexture:texture})
	}

	create_nail(empty_nail, project_id){
		fetch(URL + "nails", {
				method:"POST",
				headers:{
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.token}`
				},
				body:JSON.stringify({
					name: empty_nail.name,
					texture: empty_nail.texture,
					project_id: project_id
				})
			})
			.then(res => res.json())
	        .then(data => /*empty_nail.id = data.id*/console.log(data))

			 
	}

	handlePickProject = (id) =>{
		if (id >= 0){
		  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//reading project
			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        	fetch(URL + `projects/${id}`, {
        		method:"GET",
        		headers:{
        			Authorization: `Bearer ${localStorage.token}`
        		}
        	})
		      .then(res => res.json())
		      .then(res => {
		      	  console.log("Project")
		          console.log(res)
		          this.setState({current_project: res})
		       })

		}else {
			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//creating project
			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			let empty_nails = [{name: "left_pinky", texture: "naked.png"}, 
								{name: "left_ring", texture: "naked.png"}, 
								{name: "left_middle", texture: "naked.png"}, 
								{name: "left_index", texture: "naked.png"}, 
								{name: "left_thumb", texture: "naked.png"}]
			let empty_project = {name: "untitled", user_id: this.state.user_id, nails: empty_nails}

			fetch(URL + "projects", {
				method:"POST",
				headers:{
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.token}`
				},
				body:JSON.stringify({
					name: "untitled",
					user_id: this.state.user_id
				})
			})
			.then(res => res.json())
	        .then(data => {
	        	empty_project = {id:data.id, name: "untitled_"+data.id, user_id: this.state.user_id, nails: empty_nails}
	        	this.setState({current_project: empty_project}, this.handleCreateAndSaveEmptyNails())


	        	console.log("after")
	        	console.log(empty_nails)
	        })
			 

			
			

		}
		this.setState({page:"Editor"})

	}

	onChoseFinger = (finger) =>{
		this.setState({current_finger: finger})
	}

	handleCreateAndSaveEmptyNails = () =>{
		console.log(this.state.current_project)
		let nails = this.state.current_project.nails
		
		setTimeout(() =>this.create_nail(nails[0], this.state.current_project.id), 200);
		setTimeout(() =>this.create_nail(nails[1], this.state.current_project.id), 500);
		setTimeout(() =>this.create_nail(nails[2], this.state.current_project.id), 1000);
		setTimeout(() =>this.create_nail(nails[3], this.state.current_project.id), 1500);
		setTimeout(() =>this.create_nail(nails[4], this.state.current_project.id), 2500);

	 	

	}

 current_page(){
    switch (this.state.page){

      case "Intro":
        return <Intro handleAuth={this.handleAuth}/>

      case "Projects":
      	return <Projects handlePickProject={this.handlePickProject} projects= {this.state.projects}/>

      case "Editor":
      	return <div>
	    		<div className="Logout" onClick={this.handleLogout}>Log out!</div>
	    		<div className="Save" onClick={this.handleCreateAndSaveEmptyNails}>Save!</div>

				<PlateCanvas text = {"some text"} handleGetImgDataFromPlate = {this.handleGetImgDataFromPlate}/>   
				<PolishesShelf polishCollection={this.state.polishCollection}
								handlePickColor = {this.handlePickColor}/>
			    <Hand nails={this.state.current_project.nails} 
			    				currentPolish={this.state.currentPolish}
			    				currentTexture = {this.state.currentTexture}
			    				onChoseFinger = {this.onChoseFinger}/>
			    <WorkingCanvas nails={this.state.current_project.nails} imgData = {this.state.imgDataFromPlate}
			    				currentPolish = {this.state.currentPolish}
			    				handlePickTexture={this.handlePickTexture}
			    				currentStampingPolish = {this.state.currentStampingPolish}
			    				current_finger = {this.state.current_finger}/>
			    <StampingPolishes handlePickStampingColor= {this.handlePickStampingColor}/>
		   	 </div>
     
      default:
        return <Intro handleAuth={this.handleAuth}/>
    }


  }

	render() {
		return(

		    <div className="App">

			    {
			    	this.current_page()
			    }
		      
		    </div>
		  );
	    }
	
}



