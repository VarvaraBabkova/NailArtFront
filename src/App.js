import React from 'react';
import './App.css';
import PlateCanvas from "./containers/PlateCanvas"
import PlatesShelf from "./containers/PlatesShelf"

import WorkingCanvas from "./containers/WorkingCanvas"

import PolishesShelf from "./containers/PolishesShelf"
import StampingPolishes from "./containers/StampingPolishes"

import Hand from "./containers/Hand"

import Intro from "./containers/Intro"
import { saveAs } from 'file-saver';

import EmptyImage from './EmptyImage.png';


const URL = "http://localhost:3000/"
const white_polish = {red:255, green:255, blue:255}


export default class App extends React.Component{

	constructor() {
		super()
		//localStorage.clear()
		this.state = {
			polishCollection: [],
			plates:[],
			current_plate:{},
			//nails: [],
			imgDataFromPlate:{},
			username:"",
			password:"",
			currentPolish:{},
			currentTexture: {},
			currentStampingPolish: {},
			page: "Intro_first",
			projects:[],
			user_id:0,
			current_project: {},
			current_finger:"pinky",
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
		      	  //console.log("Projects")
		          //console.log(res)
		           this.setState({projects: res.projects})
		       })


	}
	componentDidMount(){

	 	//console.log(localStorage.token)
	 	if (localStorage.token){
	 		this.setState({ page:"Projects", user_id:localStorage.id})
		    this.readProjects(localStorage.id)

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
		            this.setState({polishCollection: res})
			    })
		      .catch(function() {
			      //  console.log("error");
			        localStorage.clear()
			    });

		      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				//reading plates
				//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		       fetch(URL + "plates", {
	        		method:"GET",
	        		headers:{
	        			Authorization: `Bearer ${localStorage.token}`
	        		}
	        	})
			      .then(res => res.json())
			      .then(res => {
			      	console.log("plates")
			      	console.log(res)
			      	//debugger
			          this.setState({plates: res, current_plate:res[1]})
			    })
			    .catch(function() {
			      //  console.log("error");
			        localStorage.clear()
			    });

	 	}


	 	this.setState({currentStampingPolish: white_polish})

	 	let empty_nails = [{name: "left_pinky", texture: "naked.png"}, 
								{name: "left_ring", texture: "naked.png"}, 
								{name: "left_middle", texture: "naked.png"}, 
								{name: "left_index", texture: "naked.png"}, 
								{name: "left_thumb", texture: "naked.png"}]
		let empty_project = {name: "untitled", user_id: this.state.user_id, nails: empty_nails, img:""}
		this.setState({current_project: empty_project})


	}

	handleGetImgDataFromPlate =(imgData) =>{
		this.setState({imgDataFromPlate: imgData}, console.log(imgData))
	}



	handleSign = (auth) =>{
		console.log(auth)
		fetch(URL + "users", {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              user:{
                username: auth.username,
				password: auth.password
              }
          })
        })
        .then(res => res.json())
        .then(data => {
        	this.handleAuth({username:data.username, password:auth.password})
        	console.log(data)
        })

	}

	

	handleAuth =(auth) =>{
		//console.log(auth)
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
        	if (data.error) {
        		this.setState({page:"Intro_rejected"})
        		//console.log(data)
        		return
        	}else{

        		localStorage.setItem("token", data.token)
	        	localStorage.setItem("id", data.user_id)
	        	this.setState({username:data.username, page:"Entered", user_id:data.user_id})
	        	user_id = data.user_id

				
				this.readPolishes()
				this.readPlates()
			   
			    this.readProjects(user_id)
        	}
        	

        	


        }) // login fetch
	}

	handleLogout = () =>{
		this.setState({username:"", password:"", page:"Intro"})
		localStorage.clear()

	}

	readPolishes = ()=>{
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
	          this.setState({polishCollection: res, currentPolish:res[0]})
	    })
	}

	readPlates = () =>{
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//reading plates
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
       fetch(URL + "plates", {
    		method:"GET",
    		headers:{
    			Authorization: `Bearer ${localStorage.token}`
    		}
    	})
	      .then(res => res.json())
	      .then(res => {
	      	console.log("plates")
	      	console.log(res)
	      	//debugger
	          this.setState({plates: res, current_plate:res[0]})
	    })
	}

	handlePickColor = (polish) =>{
		//console.log(polish)
		this.setState({currentPolish:polish})
	}

	handlePickStampingColor = (st_polish) =>{
		//console.log(st_polish)
		this.setState({currentStampingPolish:st_polish})
	}


	handlePickTexture = (texture, canvas) =>{
		//console.log(canvas.toDataURL());

			let nails = this.state.current_project.nails
			let the_nail = nails.find(nail => nail.name === "left_" + this.state.current_finger)
			the_nail.texture = canvas.toDataURL()
			let cp = this.state.current_project
			cp.nails = nails

			this.setState({current_project: cp})
		 

	}

	
	

	onChoseFinger = (finger) =>{
		this.setState({current_finger: finger})
	}


	create_nail = (nails,  project_id) =>{
		let local_nails = nails

		console.log("in creating nails")
		console.log(nails)
				console.log(project_id)


		fetch(URL + "nails", { ///FETCH NUMBER 111111111111111111
			method:"POST",
			headers:{
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.token}`
			},
			body:JSON.stringify({
				name: nails[0].name,
				texture: nails[0].texture,
				project_id: project_id
			})
		})
		.then(res => res.json())
        .then(data => {
        	console.log("0 saved " + data)
        	
        	local_nails[0] =  data
        	
        	fetch(URL + "nails", {  ///FETCH NUMBER 2222222222222222222
				method:"POST",
				headers:{
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.token}`
				},
				body:JSON.stringify({
					name: nails[1].name,
					texture: nails[1].texture,
					project_id: project_id
				})
			})
			.then(res => res.json())
	        .then(data => {
	        	console.log("1 saved " + data.id)
	        	local_nails[1] =  data
	        	
	        	fetch(URL + "nails", {  ///FETCH NUMBER 3333333
					method:"POST",
					headers:{
						"Content-Type": "application/json",
						"Authorization": `Bearer ${localStorage.token}`
					},
					body:JSON.stringify({
						name: nails[2].name,
						texture: nails[2].texture,
						project_id: project_id
					})
				})
				.then(res => res.json())
		        .then(data => {
		        	console.log("2 saved " + data.id)
		        	local_nails[2] =  data
		        	
		        	fetch(URL + "nails", {  ///FETCH NUMBER 4444444444
						method:"POST",
						headers:{
							"Content-Type": "application/json",
							"Authorization": `Bearer ${localStorage.token}`
						},
						body:JSON.stringify({
							name: nails[3].name,
							texture: nails[3].texture,
							project_id: project_id
						})
					})
					.then(res => res.json())
			        .then(data => {
			        	console.log("3 saved " + data.id)
			        	local_nails[3] =  data
			        	
			        	fetch(URL + "nails", {  ///FETCH NUMBER 55555555555
							method:"POST",
							headers:{
								"Content-Type": "application/json",
								"Authorization": `Bearer ${localStorage.token}`
							},
							body:JSON.stringify({
								name: nails[4].name,
								texture: nails[4].texture,
								project_id: project_id
							})
						})
						.then(res => res.json())
				        .then(data => {
				        	console.log("4 saved " + data.id)
				        	local_nails[4] =  data
				        	let cp = this.state.current_project
				        	 cp.nails = local_nails
				        	 this.setState({current_project: cp}, 
				        	 	this.setState({page: "Editor"}, 
				        	 		console.log(this.state.page)))
				        	console.log(local_nails)
				        	

				        })//fetch 4

			        })//fetch 3

		        })//fetch 2

	        })//fetch 1


        })//fetch 0

			 
	}

	handleCreateAndSaveEmptyNails = (project_id) =>{
		let nails = this.state.current_project.nails
		this.create_nail(nails, project_id)
		
		
	}

	updateNail =(nail, project_id) =>{
		fetch(URL + `nails/${nail.id}`, {
				method:"PATCH",
				headers:{
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.token}`
				},
				body:JSON.stringify({
					name: nail.name,
					texture: nail.texture,

				})
			})
			.then(res => res.json())
	        .then(data => /*empty_nail.id = data.id*/console.log(data))

	}

	handleSave = () => {
		//console.log(this.state.current_project)
		setTimeout(() =>this.updateNail(this.state.current_project.nails[0], this.state.current_project.id), 200);
		setTimeout(() =>this.updateNail(this.state.current_project.nails[1], this.state.current_project.id), 500);
		setTimeout(() =>this.updateNail(this.state.current_project.nails[2], this.state.current_project.id), 800);
		setTimeout(() =>this.updateNail(this.state.current_project.nails[3], this.state.current_project.id), 1000);
		setTimeout(() =>this.updateNail(this.state.current_project.nails[4], this.state.current_project.id), 1200);



	}


	handleChangeState= (state)=>{
		this.setState({page:state})
	}

	handleToProjects=()=>{
		this.setState({page:"Projects"})

	}

	handleDelete= (e, project_id)=>{
		e.stopPropagation()
		console.log(project_id)
		fetch(URL + `projects/${project_id}`, {
				method:"DELETE",
				headers:{
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.token}`
				}

			})
			.then(res => res.json())
	        .then(data => {
	        	let new_projects = this.state.projects.filter(pr => pr.id !== project_id)
	        	this.setState({projects: new_projects})

	        	console.log(data)
	        })
	}

	handleRename= (project_id, new_name)=>{
		console.log(project_id)
		console.log(new_name)
		console.log(this.state.projects)

		fetch(URL + `projects/${project_id}`, {
				method:"PATCH",
				headers:{
					"Content-Type": "application/json",
					"Authorization": `Bearer ${localStorage.token}`
				},
				body:JSON.stringify({
					name: new_name

				})
			})
			.then(res => res.json())
	        .then(data => {

	        	let new_projects = this.state.projects.map(pr => pr.id === project_id? pr = data : pr)

	        	this.setState({projects: new_projects}, console.log(this.state.projects))

	        	
	        })
	}

	handlePickPlate = (plate) =>{
		this.setState({current_plate:plate})

	}
	clearImgData = () =>{
		console.log("in CLear in App")
		console.log(this.state.imgDataFromPlate)
		this.setState({imgDataFromPlate:{}})
	}

	handlePickProject = (id) =>{

		console.log("IN PICK")
		console.log(id)
		console.log(this.state.projects)


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
		      	//  console.log("Project")
		          console.log(res)
		          this.setState({current_project: res, current_finger: "pinky"}, this.setState({ page:"Editor"}))
		          		         console.log(this.state.current_project)

		       })

		}else {
			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//creating project
			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			//debugger
			let empty_nails = [{name: "left_pinky", texture: "naked.png"}, 
								{name: "left_ring", texture: "naked.png"}, 
								{name: "left_middle", texture: "naked.png"}, 
								{name: "left_index", texture: "naked.png"}, 
								{name: "left_thumb", texture: "naked.png"}]
			let empty_project = {name: "untitled", user_id: this.state.user_id, nails: empty_nails}

			//this.setState({current_project: empty_project})
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
	        	empty_project = {id:data.id, name: "untitled_"+data.id, 
	        						img:"",
	        						user_id: this.state.user_id, nails: empty_nails}

	        	let new_projects = this.state.projects
	        	new_projects.push(empty_project)

				

	        	this.setState({current_project: empty_project, 
	        					projects:new_projects 
	        					}, () =>this.handleCreateAndSaveEmptyNails(data.id))


	        	
	        })
			
		    
		}


	}

 current_page(){

 	//console.log(this.state.current_project.img)
 	//debugger
    switch (this.state.page){

      case "Intro_first":
	  case "Intro_rejected":
	  case "Entered":  
	  case "Projects":
        return <Intro handleAuth={this.handleAuth} state={this.state.page} 
		        		handlePickProject={this.handlePickProject} projects= {this.state.projects} 
        				handleChangeState={this.handleChangeState} handleDelete = {this.handleDelete}
        				handleRename = {this.handleRename}
        				handleSign = {this.handleSign}/>

    
      case "Editor":
      	return <div>
      			<div className="projectPanel" >
      			    <div className="projectName">{this.state.current_project.name}</div>

      				<div className="projectButtonsPanel">
      					<div className="save" onClick={this.handleSave}>Save!</div>
			    		<div className="toProjects" onClick={this.handleToProjects}>To projects...</div>
			    		<div className="logout" onClick={this.handleLogout}>Log out!</div>

			    	</div>
		    		<div className="projectImg"  alt="">
		    			<img src=
		    			{(this.state.current_project.img )?
		    			this.state.current_project.img
		    			:EmptyImage
		    			} 
		    			alt=""/>
		    		</div>
	    		</div>
				
				 	<PlateCanvas  handleGetImgDataFromPlate = {this.handleGetImgDataFromPlate}
				 					plate = {this.state.current_plate}/>   
 					
 					<PlatesShelf  handlePickPlate = {this.handlePickPlate}
							 		plates = {this.state.plates}/>   
					
					<PolishesShelf polishCollection={this.state.polishCollection}
								   handlePickColor = {this.handlePickColor}/>	
				 
			    <Hand nails={this.state.current_project.nails} 
			    				currentPolish={this.state.currentPolish}
			    				currentTexture = {this.state.currentTexture}
			    				onChoseFinger = {this.onChoseFinger}
			    				current_finger = {this.state.current_finger}/>
			   


			    <WorkingCanvas nails={this.state.current_project.nails} 
			    				imgData = {this.state.imgDataFromPlate}
			    				currentPolish = {this.state.currentPolish}
			    				handlePickTexture={this.handlePickTexture}
			    				currentStampingPolish = {this.state.currentStampingPolish}
			    				current_finger = {this.state.current_finger}
			    				clearImgData={this.clearImgData}
			    				// handleClearStampingArea={this.handleClearStampingArea}
			    				/>


			    				
			     <StampingPolishes handlePickStampingColor= {this.handlePickStampingColor}/>
			     		
			     <img className="bg_florish_right" src={require('./flourish-4.png')} alt="" />
			     <img className="bg_florish_left" src={require('./flourish-4-left.png')} alt="" />
			     <img className="bg_florish_center_right" src={require('./flourish-4.png')} alt="" />
			     <img className="bg_florish_center_left" src={require('./flourish-4-left.png')} alt="" />
			     <img className="bg_florish_center_down_right" src={require('./flourish-4-right-ud.png')} alt="" />
			     <img className="bg_florish_center_down_left" src={require('./flourish-4-left-ud.png')} alt="" />
			     {
			     	// <div className="flower"></div>
			     }
			     
		   	 </div>
     
      default:
        return <Intro handleAuth={this.handleAuth} state={this.state.page} 
		        		handlePickProject={this.handlePickProject} projects= {this.state.projects} 
        				handleChangeState={this.handleChangeState} handleDelete = {this.handleDelete}
        				handleRename = {this.handleRename}
        				handleSign = {this.handleSign}/>
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



