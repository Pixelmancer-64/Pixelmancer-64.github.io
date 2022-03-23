import React, { Component } from "react";
import Coin from "./Coin";
class CoinFlipper extends Component {
  static defaultProps = {sides: ['one', 'two', 'three', 'four', 'five', 'six']}


    constructor(...args){
        super(...args);
        this.state = {total: 0, heads: 0, tails: 0, isHead: null}
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
      const isHead = (Math.round(Math.random()) ? true : false);
      (isHead) ? this.setState({heads: this.state.heads + 1}) : this.setState({tails: this.state.tails + 1}) 
      this.setState({total: this.state.total + 1, isHead: isHead})  
    }

  render() {
    return (
      <div className="CoinFlipper">
        {(this.state.total) ? <Coin head={this.state.isHead}/> : ''}
        <h1>Total: {this.state.total}, Head: {this.state.heads}, Tail: {this.state.tails}</h1>
        <button onClick={this.handleClick}>Flip</button>
      </div>
    );
  }
}

export default CoinFlipper;
