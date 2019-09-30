import React from 'react';
import ReactDOM from "react-dom";
import * as THREE from "three";
// import picture from "../OPI_Scotland.png";


export default class Polish extends React.Component {


	componentDidMount() {

	    let canvas = this.refs.canvas
		let ctx = canvas.getContext("2d")

	    const img = this.refs.image
     
	    img.onload = () => {
		
	       ctx.font = "10px Arial";
	       ctx.textAlign = "center";
	      ctx.drawImage(img, this.props.polish.img_x, this.props.polish.img_y, 
	      	this.props.polish.img_width , this.props.polish.img_height,
	      	 0, 0, 
	      	canvas.width, canvas.height)
	      ctx.fillText(this.props.polish.name, canvas.width/2, canvas.height - 2);

		}
	    
	}

	render() {
		//console.log(this.props.polish.name)
	    return(
	    	<div>
		        <canvas className="polishImg"  
		        		ref="canvas"
		        		onClick = {() => this.props.handlePickColor(this.props.polish)} >
		        	{this.props.polish.name}
		        </canvas>
		        {
		        	//<img ref="image" alt = "" src={require('../OPI_Scotland.png')} className="hidden" />

		        }
		        <img ref="image" alt = "" src={this.props.polish.img} className="hidden" />

	        </div>

	    )
	  }
}


