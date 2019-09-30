import React from 'react';
import * as THREE from "three";

const pick_width = 50;
const pick_height = 70
export default  class WorkingCanvas extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			current_polish: {},
			current_finger: "",
		}
	}

	componentDidMount() {
	    
	    let canvas = this.refs.canvas
	    canvas.addEventListener("mousedown", this.handleClick, false);

	 }

	handleClick = (e) =>{
	 	e.stopPropagation();	
	 	  	// debugger

	  	 let canvas = this.refs.canvas
	  	this.props.handlePickTexture(new THREE.CanvasTexture( this.refs.canvas ), canvas)
	 }


	  // handleMouseDown = (e) =>{
	  		
	  // }


	 scaleImageData(imageData, scale, ctx) {
	    var scaled = ctx.createImageData(imageData.width * scale, imageData.height * scale);
	    var subLine = ctx.createImageData(scale, 1).data
	    for (var row = 0; row < imageData.height; row++) {
	        for (var col = 0; col < imageData.width; col++) {
	            var sourcePixel = imageData.data.subarray(
	                (row * imageData.width + col) * 4,
	                (row * imageData.width + col) * 4 + 4
	            );
	            for (var x = 0; x < scale; x++) subLine.set(sourcePixel, x*4)
	            for (var y = 0; y < scale; y++) {
	                var destRow = row * scale + y;
	                var destCol = col * scale;
	                scaled.data.set(subLine, (destRow * scaled.width + destCol) * 4)
	            }
	        }
	    }

	    return scaled;
	}

	


	lighter([a, b, c]) {
        const lim = 150
        if (a >= lim && b >= lim && c >= lim)  
                return true
        else 
                return false;
	}
	darker([a, b, c]) {
        const lim = 50
        //debugger
        //console.log([a, b, c])
        if (a <= lim && b <= lim && c <= lim)  
                return true
        else 
                return false;
	}


	colorImageData(imageData, bkcolor, color, ctx){
		//debugger
		let colored = ctx.getImageData(0, 0, imageData.width, imageData.height);

		for (let i = 0; i < imageData.data.length; i += 4) {
			//colored.data[i] = imageData.data[i]

			let trio = [imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]]
//debugger
			//if (JSON.stringify(trio) === JSON.stringify([0, 0, 0])){
			if(this.lighter(trio)){
				//console.log(colored.data[i])
				  colored.data[i] = bkcolor[0]
	              colored.data[i + 1] = bkcolor[1]
	              colored.data[i + 2] = bkcolor[2]   
			}else{
				colored.data[i] = color[0]
	              colored.data[i + 1] = color[1]
	              colored.data[i + 2] = color[2]   
			}
		}
		//console.log(colored.data)
		return colored;
	}

	draw() {
		var canvas = this.refs.canvas
	    const ctx = canvas.getContext("2d")

	   
	    let current_nail = this.props.nails.find(nail => nail.name === "left_" + this.props.current_finger)
	    if (this.state.current_finger !== this.props.current_finger) {
	    	this.setState({current_finger: this.props.current_finger})
	    	

	    	return
	    }

	    if (this.props.currentPolish) {
	    	if (this.state.current_polish !== this.props.currentPolish) {
	    		this.setState({current_polish:this.props.currentPolish})
	    		ctx.fillStyle = `rgb(${this.props.currentPolish.red}, 
	    							${this.props.currentPolish.green}, 
	    							${this.props.currentPolish.blue})`;
			    ctx.fillRect(0, 0, canvas.width, canvas.height);
	    
	    	}
	    	
	    }
	    else
	    {
	    	this.setState({current_polish:{red:"255", blue:"255", green:"255"}})

	    }
	     let st_polish 
	    if (this.props.currentStampingPolish) {
	    	st_polish = this.props.currentStampingPolish
	    }
	    else
	    {
	    	st_polish.red = "255"; 
	    	st_polish.green = "255";
	    	st_polish.blue = "255"

	    }
	    

	    if (this.props.imgData.data) {
	    	
	    
		     ctx.putImageData(this.colorImageData(this.scaleImageData(this.props.imgData, 4, ctx),
		     	[this.state.current_polish.red, this.state.current_polish.green, this.state.current_polish.blue], 
		     	[st_polish.red, st_polish.green, st_polish.blue], ctx), 0, 0);


	    }
	  }

	handleClearStampingArea=()=>{
		console.log(this.props.currentPolish)

		let canvas = this.refs.canvas
	    const ctx = canvas.getContext("2d")

		if (this.props.currentPolish) {
	    		//this.setState({current_polish:this.props.currentPolish})
	    		ctx.fillStyle = `rgb(${this.props.currentPolish.red}, 
	    							${this.props.currentPolish.green}, 
	    							${this.props.currentPolish.blue})`;
			    ctx.fillRect(0, 0, canvas.width, canvas.height);
	    		
	    		this.props.clearImgData()
	    	
	    	
	    }
	    
	} 

	render() {
		//console.log(this.props.current_finger)
		if(this.refs.canvas)
			this.draw()

	    return(
	    	<div>
		      <div className="leftPanel" >
		        <canvas className="workingCanvas" 
		        			ref="canvas" 
		        			width={pick_width*4} 
		        			height={pick_height*4}
		        			onClick={(e) => this.handleClick(e)}/>
		        	
		     
				

		        	<div className="cleanButton" onClick={this.handleClearStampingArea}> Clear</div>
					<div className="eraserButton"> Eraser</div>
		      </div>
		      
	      	</div>

	    )
	  }
}



