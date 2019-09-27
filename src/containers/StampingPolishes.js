import React from 'react';
import StampingPolish from '../components/StampingPolish';


class StampingPolishes extends React.Component {

	// constructor(props){
	// 	super(props)
	// 	this.state = {
	// 		polish: {},
	// 	}
	// }

	// componentDidMount() {
	    
	//  }

	


	render() {
		
		
	    return(
	    	<div className = "">
		      <div className="stampingPolishes">
		       	<StampingPolish color = {[255, 255, 255]} handlePickStampingColor= {this.props.handlePickStampingColor}/>
		       	<StampingPolish color = {[0, 0, 0]} handlePickStampingColor= {this.props.handlePickStampingColor}/>
		       	<StampingPolish color = {[220, 220, 220]} handlePickStampingColor= {this.props.handlePickStampingColor}/>
		       	<StampingPolish color = {[181, 144, 110]} handlePickStampingColor= {this.props.handlePickStampingColor}/>
		       	<StampingPolish color = {[57, 29, 47]} handlePickStampingColor= {this.props.handlePickStampingColor}/>
		       	<StampingPolish color = {[184, 151, 159]} handlePickStampingColor= {this.props.handlePickStampingColor}/>
		       	<StampingPolish color = {[94, 148, 154]} handlePickStampingColor= {this.props.handlePickStampingColor}/>

			</div>

	      </div>
	    )
	  }
}
export default StampingPolishes