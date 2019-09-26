import React from 'react';


let ctx;
let canvas
const pick_width = 50;
const pick_height = 70

export default class PlateCanvas extends React.Component {

	componentDidMount() {


	    const img = this.refs.image
		 canvas = this.refs.canvas
		 ctx = canvas.getContext("2d")

	    img.onload = () => {
	    console.log(img.width)
	    console.log(img.height)

	      
	    
	      ctx.drawImage(img, 22, 22, img.width/2, img.height, 0, 0, canvas.width, canvas.height)
	      
	     
	     // canvas.addEventListener("mousemove", this.handleMouseMove, false);
	      canvas.addEventListener("mousedown", this.handleMouseClick, false);

	    }
	  }

	handleMouseMove= (event) =>{
		

	} 
	handleMouseClick= (event) => {
		canvas = this.refs.canvas
		 ctx = canvas.getContext("2d")
		 let panel_div = this.refs.div

		 console.log(event.pageX)

		 let offsetLeft = panel_div.offsetLeft + ctx.canvas.offsetLeft
		 let offsetTop = panel_div.offsetTop + ctx.canvas.offsetTop


		ctx.lineWidth = "1";
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.rect(event.pageX - offsetLeft - pick_width/2, 
				event.pageY - offsetTop - pick_height/2, 
				pick_width, pick_height)
		ctx.stroke();

		 let imgData = ctx.getImageData(event.pageX - offsetLeft- pick_width/2, 
		 								event.pageY - offsetTop - pick_height/2 , 
		 								pick_width , pick_height );
		// console.log(imgData)
		 this.props.handleGetImgDataFromPlate(imgData)
 


	} 
	render() {

	    return(
		      <div className="rightPanel" ref="div">
		        <canvas className="plateCanvas" ref="canvas" width={250} height={500} />
		        <img ref="image" alt = "" src={require('../55.-Henna-11.jpg')} className="hidden" />

		      </div>
	    )
	  }
}
 


