import React from 'react';


class StampingPolish extends React.Component {

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
		
		
	    return(
	      <div className="stampingPolish"  
	      			style={{backgroundColor: `rgb(${this.props.color})`}}//`${this.props.color}`}}
	      			onClick = {() => this.props.handlePickStampingColor({red:this.props.color[0],
	      				green:this.props.color[1],blue:this.props.color[2]})}>
	       		
	      </div>
	    )
	  }
}
export default StampingPolish