import React from 'react';
import Project from '../components/Project';



export default class Projects extends React.Component {

	render() {
		//console.log("in projects")
		//console.log(this.props.projects)
		
		return(

		    <div className="Projects">
		    	<div className="Project" onClick = {() => this.props.handlePickProject(-1)} > New Project </div>
		      	{
		      		this.props.projects.map(project => <Project project={project} 
												      			handlePickProject = {this.props.handlePickProject}
												      			key={project.id}
												      			handleDelete = {this.props.handleDelete}
												      			handleRename = {this.props.handleRename}
												      			/>)
		      	}
		    </div>
		  );
	    }
	
}