import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

class TodoForm extends Component {
  constructor(...props) {
    super(...props);
    this.state = { task: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.add({...this.state, key: uuidv4(), isCompleted: false})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="task">New Todo</label>
        <input
          type="text"
          id="task"
          name="task"
          placeholder="New Todo"
          onChange={this.handleChange}
        />
        <button>Add</button>
      </form>
    );
  }
}

export default TodoForm;
