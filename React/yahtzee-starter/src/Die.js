import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  constructor(...props){
    super(...props)
    this.handleCLick = this.handleCLick.bind(this)
    this.words = ['one', 'two', 'three', 'four', 'five', 'six']
  }

  handleCLick(){
    this.props.handleClick(this.props.idx)
  }

  render() {
    return (
      <button
        className={"Die"}
        style={{ backgroundColor: this.props.locked ? "grey" : "black" }}
        onClick={this.handleCLick}
        disabled={this.props.disabled}
      >
        <i className={"fas fa-dice-" + this.words[this.props.val-1]}></i>
      </button>
    );
  }
}

export default Die;
