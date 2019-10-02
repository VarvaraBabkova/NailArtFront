import React from 'react';


let ctx;
let canvas
const pick_width = 50;
const pick_height = 70;

export default class PlateCanvas extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			vertical:true,
		}
	}

	componentDidMount() {


	    const img = this.refs.image
		 canvas = this.refs.canvas
		 ctx = canvas.getContext("2d")

	    img.onload = () => {
	      
		  ctx.drawImage(img, 0, 0, img.width/2 + 26, img.height, 0, 0, canvas.width, canvas.height)
    
	      canvas.addEventListener("mousemove", this.handleMouseMove, false);
	      canvas.addEventListener("mousedown", this.handleMouseClick, false);

	    }
	  }

	handleMouseMove= (event) =>{

		const img = this.refs.image

		canvas = this.refs.canvas
		 ctx = canvas.getContext("2d")
		 let panel_div = this.refs.div


		 let offsetLeft = panel_div.offsetLeft + ctx.canvas.offsetLeft
		 let offsetTop = panel_div.offsetTop + ctx.canvas.offsetTop

		 ctx.drawImage(img, 0, 0, img.width/2 + 26, img.height , 0, 0, canvas.width, canvas.height)

		ctx.lineWidth = "1";
			ctx.strokeStyle = "black";
			ctx.beginPath();

			if (this.state.vertical) {
				ctx.rect(event.pageX - offsetLeft - pick_width/2 - 1, 
					event.pageY - offsetTop - pick_height/2 - 1, 
					pick_width + 2, pick_height + 2)
			}else{
				ctx.rect(event.pageX - offsetLeft - pick_height/2 - 1, 
					event.pageY - offsetTop - pick_width/2 - 1, 
					pick_height + 2, pick_width + 2)
			}
			


			ctx.stroke();
	} 

	transposeMatrix(imageData) {
	    let result = ctx.createImageData(imageData.height, imageData.width);
	    for (let row = 0; row < imageData.height; row++) {
	        for (let col = 0; col < imageData.width; col++) {
	            let sourcePixel = imageData.data.subarray(
	                (row * imageData.width + col) * 4,
	                (row * imageData.width + col) * 4 + 4
	            );
	            let destRow = result.height - 1 - col;
	            // let destRow = col;  would be upside down !!!
	            let destCol = row ;
	            result.data.set(sourcePixel, (destRow * result.width + destCol) * 4)
	        }
	    }

		
		return result
	}

	handleMouseClick= (event) => {
		canvas = this.refs.canvas
		 ctx = canvas.getContext("2d")
		 let panel_div = this.refs.div

		 console.log(event.pageX)

		 let offsetLeft = panel_div.offsetLeft + ctx.canvas.offsetLeft
		 let offsetTop = panel_div.offsetTop + ctx.canvas.offsetTop


		let imgData
		if (this.state.vertical) {
			 imgData = ctx.getImageData(event.pageX - offsetLeft- pick_width/2, 
		 								event.pageY - offsetTop - pick_height/2 , 
		 								pick_width , pick_height );
		}else{
			imgData = this.transposeMatrix(
						ctx.getImageData(event.pageX - offsetLeft- pick_height/2, 
		 								event.pageY - offsetTop - pick_width/2 , 
		 								pick_height , pick_width )
						);

		}
		 console.log(imgData)
		 this.props.handleGetImgDataFromPlate(imgData)
 
	} 

	changeCursor = () =>{
		this.setState({vertical: !this.state.vertical})
	}
	render() {
		//console.log(this.props.plate.img)
	    return(
		      <div className="rightPanel" ref="div">
		      	
		        <canvas className="plateCanvas" ref="canvas" width={250} height={500 } />
		        {
		        	<img ref="image" alt = "" src={this.props.plate.img} className="hidden" />

		        }
		        <img alt = "" src={(this.state.vertical?
		        	require('../cursor_icon_up.png'):require('../cursor_icon_right.png'))} 
		        		className={"cursor_icon"} onClick={this.changeCursor}/>
		        
		      </div>
	    )
	  }
}
 


