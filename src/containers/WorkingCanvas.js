import React from 'react';
import * as THREE from "three";


class WorkingCanvas extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			polish: {},
		}
	}

	componentDidMount() {
	    
	    //debugger
	  }

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
		let colored = ctx.getImageData(20, 20, imageData.width, imageData.height);

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
	    //const img = this.refs.image


	    //let polish = this.props.nails[0].polishes[0]
	    let polish 
	    if (this.props.currentPolish) {
	    	polish = this.props.currentPolish
	    	

	    }
	    else
	    {
	    	polish.red = "255"; 
	    	polish.green = "255";
	    	polish.blue = "255"

	    }
//debugger
	    ctx.fillStyle = `rgb(${polish.red}, ${polish.green}, ${polish.blue})`;
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
	    if (this.props.imgData.data) {
	    	console.log(this.props.imgData)
	    	

		// ctx.putImageData(this.props.imgData, 20, 20)

		// ctx.putImageData(this.colorImageData(this.props.imgData,
		// [polish.red, polish.green, polish.blue],
		// [255, 255, 255], ctx), 120, 120)

	    	// ctx.putImageData(this.colorImageData(this.props.imgData,
	    	 //[polish.red, polish.green, polish.blue], [255, 255, 255], ctx), 20, 20);
	    
	     ctx.putImageData(this.colorImageData(this.scaleImageData(this.props.imgData, 4, ctx),
	     	[polish.red, polish.green, polish.blue], [255, 255, 255], ctx), 10, 10);

	    //ctx.putImageData(this.scaleImageData(this.props.imgData, 4, ctx), 20, 20)

	    }
	  }


	render() {
		if (this.props.nails[0]){
			if (this.props.nails[0].polishes[0]) {
				// console.log(this.props.nails[0].polishes[0])
				// console.log("ever?")
				this.draw()
		}
			
		}
	    return(
	      <div>
	        <canvas className="workingCanvas" ref="canvas" width={150} height={210}
	        		onClick={() => this.props.handlePickTexture(new THREE.CanvasTexture( this.refs.canvas ))}/>
	      </div>
	    )
	  }
}
export default WorkingCanvas