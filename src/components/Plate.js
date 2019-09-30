import React from 'react';



export default class Plate extends React.Component {


	componentDidMount() {

	    let canvas = this.refs.canvas
		let ctx = canvas.getContext("2d")

	    const img = this.refs.image
     
	    img.onload = () => {
		
	       ctx.font = "10px Arial";
	       ctx.textAlign = "center";

	       ctx.drawImage(img, 0, 0, img.width/2 + 25, img.height, 0, 5, canvas.width, canvas.height)

	      
	    //  ctx.fillText(this.props.polish.name, canvas.width/2, canvas.height - 2);

		}
	    
	}

	render() {
		console.log(this.props.plate)
	    return(
	    	<div>
		        <canvas className="plateImg"  
		        		ref="canvas"
		        		onClick = {() => this.props.handlePickPlate(this.props.plate)} >
		        	{this.props.plate.number}
		        </canvas>
		        
		        <img ref="image" alt = "" src={this.props.plate.img} className="hidden" />

	        </div>

	    )
	  }
}