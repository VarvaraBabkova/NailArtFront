import React from 'react';


let ctx;
let canvas

class PlateCanvas extends React.Component {

	componentDidMount() {
	    
	    const img = this.refs.image
		 canvas = this.refs.canvas
		 ctx = canvas.getContext("2d")

	    img.onload = () => {
	      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
	      ctx.font = "40px Courier"
	      ctx.fillText(this.props.text, 210, 75)
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
		console.log(ctx.canvas.offsetLeft)
		console.log(event.pageX)

		ctx.lineWidth = "1";
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.rect(event.pageX - ctx.canvas.offsetLeft, event.pageY - ctx.canvas.offsetTop, 50, 70)
		ctx.stroke();

		 let imgData = ctx.getImageData(event.pageX - ctx.canvas.offsetLeft, event.pageY - ctx.canvas.offsetTop, 50, 70);
		// console.log(imgData)
		 this.props.handleGetImgDataFromPlate(imgData)
 


	} 
	render() {

	    return(
	      <div>
	        <canvas className="plateCanvas" ref="canvas" width={250} height={500} />
	        <img ref="image" alt = "" src={require('../trend_hunter_23.png')} className="hidden" />
	      </div>
	    )
	  }
}
export default PlateCanvas