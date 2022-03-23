import React, { Component } from "react";

class Button extends Component {

    constructor(...args){
        super(...args)
        this.state = {
            clicked: false,
            num: 1,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.setState({num: Math.ceil(Math.random() * 10)})
    }

  render() {
    return (
        <div>
        <h1>Number is {this.state.num}</h1>
        {(this.state.num !== 7) ? <button onClick={this.handleClick}>Click me</button> : <h1>You Win!</h1>}
        </div>
    );
  }
}

export default Button;
