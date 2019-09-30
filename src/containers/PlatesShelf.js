import React from 'react';
import Plate from '../components/Plate';



export default class PlatesShelf extends React.Component {

	componentDidMount() {


	   
	}

	handleMouseMove= (event) =>{
		

	} 
	
	render() {
		console.log(this.props.plates)
	    return(
		      <div className="rightestPanel" ref="div">
		      	
		        <div className="platesShelf"  >
		        {
		        	this.props.plates.map((plate, index) => 
		        			<Plate key = {index} 
			        				handlePickPlate={this.props.handlePickPlate}
			        				plate = {plate}
			        				/>
		        		)

		        }
		        </div>

		      </div>
	    )
	  }
}