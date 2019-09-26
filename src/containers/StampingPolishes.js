import React from 'react';
import StampingPolish from '../components/StampingPolish';


class StampingPolishes extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			polish: {},
		}
	}

	componentDidMount() {
	    
	    //debugger
	  }

	


	render() {
		
		//this.draw()
		
	    return(
	    	<div className = "">
		      <div className="stampingPolishes">
		       	<StampingPolish color = {[255, 255, 255]} handlePickStampingColor= {this.props.handlePickStampingColor}/>
		       	<StampingPolish color = {[0, 0, 0]} handlePickStampingColor= {this.props.handlePickStampingColor}/>
		       	<StampingPolish color = {[255, 0, 0]} handlePickStampingColor= {this.props.handlePickStampingColor}/>
		       	<StampingPolish color = {[0, 255, 0]} handlePickStampingColor= {this.props.handlePickStampingColor}/>
		       	<StampingPolish color = {[0, 0, 255]} handlePickStampingColor= {this.props.handlePickStampingColor}/>
		       	<StampingPolish color = {[255, 255, 0]} handlePickStampingColor= {this.props.handlePickStampingColor}/>
			</div>

	      </div>
	    )
	  }
}
export default StampingPolishes