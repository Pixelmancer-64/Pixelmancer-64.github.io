import React, { Component } from "react";
import Box from "./Box";
import BoxForm from "./BoxForm";

class Boxlist extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      boxes: [],
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
  }

  create(box) {
    this.setState({ boxes: [...this.state.boxes, box] });
  }

  remove(id){
    this.setState({boxes: this.state.boxes.filter(e => e.id !== id)})
  }

  render() {
    return (
      <div>
        <BoxForm createBox={this.create} />
        {this.state.boxes.map((e) => (
          <Box key={e.key} id={e.key} height={e.height} width={e.width} color={e.color} removeBox={this.remove}/>
        ))}
      </div>
    );
  }
}

export default Boxlist;
