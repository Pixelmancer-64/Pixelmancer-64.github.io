import React, { Component } from "react";
import Die from "./Die";
import './RollDice.css';

class Rolldice extends Component {
  static defaultProps = {sides: ['one', 'two', 'three', 'four', 'five', 'six']}


    constructor(...args){
        super(...args);
        this.state = {die_1: 'one', die_2: 'two', isRolling: false}
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.setState({
            die_1: this.props.sides[Math.floor(Math.random()*this.props.sides.length)],
            die_2: this.props.sides[Math.floor(Math.random()*this.props.sides.length)],
            isRolling: true, 
        })

        setTimeout(() => {
            this.setState({isRolling: false})
        }, 1000);
    }

  render() {
    return (
      <div className="RollDice">
      <div>
        <Die face={this.state.die_1}/>
        <Die face={this.state.die_2}/>
        </div>
        <button onClick={this.handleClick} disabled={this.state.isRolling}>{this.state.isRolling ? 'Rolling...' : 'Roll the dice!'}</button>
      </div>
    );
  }
}

export default Rolldice;
