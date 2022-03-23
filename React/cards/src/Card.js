import React, { Component } from "react";
import "./Card.css";

class Card extends Component {


  constructor(...props){
      super(...props)

    this.trans = {
        angle: Math.random() * 90 - 45,
        xOff: Math.random() * 40 - 20,
        yOff: Math.random() * 40 - 20,
      };
  }

  render() {
      const style = `translate(${this.trans.xOff}px, ${this.trans.yOff}px) rotate(${this.trans.angle}deg)`
    return (
      <img
        style={{transform: style}}
        className="Card"
        src={this.props.src}
        alt={this.props.alt}
      />
    );
  }
}

export default Card;
