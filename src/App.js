import React from 'react';
import './App.css';
import Canvas from "./containers/Canvas"
import PolishesShelf from "./containers/PolishesShelf"
import Hand from "./containers/Hand"

const URL = "http://localhost:3000/"


export default class App extends React.Component{

	constructor() {
		super()
		this.state = {
			polishCollection: [],
		}
		
	}

	componentDidMount(){
		fetch(URL + "polishes")
	      .then(res => res.json())
	      .then(res => {
	          //console.log(res)
	            this.setState({polishCollection: res})
	          })
	    

	}

	render() {
	  return (
	    <div className="App">
	      <Canvas text = {"some text"}/>
	      <PolishesShelf polishCollection={this.state.polishCollection}/>
	      <Hand polishCollection={this.state.polishCollection}/>
	    </div>
	  );
	}
}


{
		      //

}

