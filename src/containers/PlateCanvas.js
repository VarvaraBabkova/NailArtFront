import React from 'react';


let ctx;
let canvas
const pick_width = 50;
const pick_height = 70

class PlateCanvas extends React.Component {

	componentDidMount() {
	    
	    const img = this.refs.image
		 canvas = this.refs.canvas
		 ctx = canvas.getContext("2d")

	    img.onload = () => {
	    console.log(img.width)
	    console.log(img.height)

	      
	     // ctx.translate(canvas.width/2, canvas.height/2);
	      //ctx.rotate(Math.PI/2)
	      ctx.drawImage(img, 0, 0, img.width/2, img.height,

	      		0, 0, canvas.width, canvas.height)
	      //ctx.rotate(-Math.PI/2)
	      //ctx.translate(-canvas.width/2,-canvas.height/2);
	     
	      canvas.addEventListener("mousemove", this.handleMouseMove, false);
	      canvas.addEventListener("mousedown", this.handleMouseClick, false);

	    }
	  }

	handleMouseMove(event){
		//console.log(event.pageX)
		//console.log(event.pageY)


	} 
	handleMouseClick= (event) => {
		canvas = this.refs.canvas
		 ctx = canvas.getContext("2d")
		// console.log(ctx.canvas.offsetLeft)
		// console.log(event.pageX)

		// ctx.lineWidth = "1";
		// ctx.strokeStyle = "black";
		// ctx.beginPath();
		// ctx.rect(event.pageX - ctx.canvas.offsetLeft, 
		// 		event.pageY - ctx.canvas.offsetTop, 
		// 		pick_width, pick_height)
		// ctx.stroke();

		 let imgData = ctx.getImageData(event.pageX - ctx.canvas.offsetLeft, 
		 								event.pageY - ctx.canvas.offsetTop , 
		 								pick_width , pick_height );
		// console.log(imgData)
		 this.props.handleGetImgDataFromPlate(imgData)
 


	} 
	render() {

	    return(
	      <div>
	        <canvas className="plateCanvas" ref="canvas" width={250} height={500} />
	        <img ref="image" alt = "" src={require('../55.-Henna-11.jpg')} className="hidden" />
	      </div>
	    )
	  }
}
export default PlateCanvas