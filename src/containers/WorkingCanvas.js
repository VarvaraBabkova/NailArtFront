import React from 'react';

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

	 colorImageData(imageData, bkcolor, color, ctx){
	    var colored = ctx.createImageData(imageData.width, imageData.height);

	 	let data = imageData.data

        for (var i = 0; i < data.length; i += 4) {
          //var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          let trio = [data[i], data[i + 1], data[i + 2]]

			if (JSON.stringify(trio) === JSON.stringify([255, 255, 255])){
				console.log(colored.data[i])
				  	colored.data[i] = bkcolor[0]
	              colored.data[i + 1] = bkcolor[1]
	              colored.data[i + 2] = bkcolor[2]
	              console.log("after")
	              			console.log(colored.data[i])
	// debugger
			}else{

			}

          // if (JSON.stringify(trio) != JSON.stringify([bkcolor[0], bkcolor[1], bkcolor[2]])
          // 			 && this.lighter(trio))
          // {
          //   //console.log(i, trio)
          //         data[i] = bkcolor[0]
          //         data[i + 1] = bkcolor[1]
          //         data[i + 2] = bkcolor[2]
          // }
          // if (  !this.lighter(trio)){
          //     data[i] = color[0]
          //         data[i + 1] = color[1]
          //         data[i + 2] = color[2]
          // }
            
         
        }
        console.log(colored.data)
        return colored
	 }


	 lighter([a, b, c]) {
        const lim = 100
        if (a >= lim && b >= lim && c >= lim)  
                return true
        else 
                return false;
	}



	 draw() {
		const canvas = this.refs.canvas
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
	    	

	    // ctx.putImageData(this.colorImageData(this.scaleImageData(this.props.imgData, 4, ctx),
	    // 	[polish.red, polish.green, polish.blue], [255, 255, 255], ctx), 20, 20);

	    ctx.putImageData(this.scaleImageData(this.props.imgData, 4, ctx), 20, 20)

	    }
	  }


	render() {
		if (this.props.nails[0]){
			if (this.props.nails[0].polishes[0]) {
				console.log(this.props.nails[0].polishes[0])
				console.log("ever?")
				this.draw()
		}
			
		}
	    return(
	      <div>
	        <canvas className="workingCanvas" ref="canvas" width={300} height={300} />
	      </div>
	    )
	  }
}
export default WorkingCanvas