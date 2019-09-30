import React from 'react';


export default class Project extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			state: "show",
			name:"",
			project:{},		
		}
	}

	componentDidMount() {
		this.setState({name:this.props.project.name, project:this.props.project})
	}

	handleRename =(e) =>{
		e.stopPropagation();
		this.setState({state: "edit"})
	}

	handleUserInputChange = (e) =>{

		this.setState({name: e.target.value}, console.log(this.state.name))

	}	

	onEditClick =(e) =>{
		e.stopPropagation()
	}

	handleKeyDown=(e)=>{
		if (e.key === 'Enter') {
			this.setState({state: "show"})
		     this.props.handleRename(this.props.project.id, this.state.name)
		 }
	}

	render() {
		//console.log(this.props)
		return(

		    <div className="Project" onClick={() =>this.props.handlePickProject(this.props.project.id)}>

		      	{
		      		(this.state.state === "show")? 
		      			this.props.project.name
		      		:
		      		<input id="name" name="name" type="text"  ref={c => (this._input = c)} 
                        onChange={(e) =>this.handleUserInputChange(e)} 
                        onClick={(e) => this.onEditClick(e)}
                        value={this.state.name}
                        onKeyDown={this.handleKeyDown}/>
		      		
		      		
		      	}
		      	<div className="projectDelete" onClick={(e)=>this.props.handleDelete(e, this.props.project.id)}></div>
		      	<div className="projectRename" onClick={(e)=>this.handleRename(e) }></div>


		    </div>
		  );
	    }
	
}