import React, { Component } from "react";

class Coin extends Component {

  render() {
    return (
        <h1>{(this.props.head) ? 'Head' : 'Tails'}</h1>
    );
  }
}

export default Coin;
