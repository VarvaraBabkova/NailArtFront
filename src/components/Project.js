import React from 'react';


export default class Project extends React.Component {

	render() {
		return(

		    <div className="Project" onClick={() =>this.props.handlePickProject(this.props.project.id)}>
		      	{
		      		this.props.project.name
		      	}
		    </div>
		  );
	    }
	
}