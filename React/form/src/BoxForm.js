import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

class BoxForm extends Component {
  constructor(...props) {
    super(...props);
    this.state = { width: "", height: "", color: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e){
    this.setState({
        [e.target.name]: e.target.value
    });
  }

  handleSubmit(e){
      e.preventDefault();     
      const key = uuidv4()
      this.props.createBox({...this.state, key, id: key})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="height">Height</label>
        <input
          type="text"
          name="height"
          value={this.state.height}
          onChange={this.handleChange}
          id="height"
          key="height"
        />

        <label htmlFor="width">Width</label>
        <input
          type="text"
          name="width"
          value={this.state.width}
          onChange={this.handleChange}
          id="width"
          key="width"
        />

        <label htmlFor="color">Color</label>
        <input
          type="text"
          name="color"
          value={this.state.color}
          onChange={this.handleChange}
          id="color"
          key="color"
        />

        <button>ADD</button>
      </form>
    );
  }
}

export default BoxForm;
