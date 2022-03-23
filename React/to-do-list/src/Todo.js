import React, { Component } from "react";
import './Todo.css'

class Todo extends Component {
  constructor(...props) {
    super(...props);

    this.state = { isForm: false, task: this.props.task };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCompletion = this.handleCompletion.bind(this)
  }

  handleRemove() {
    this.props.remove(this.props.id);
  }

  handleEdit() {
    this.setState({ isForm: !this.state.isForm });
  }

  handleSave(e) {
    e.preventDefault();
    this.props.update(this.props.id, this.state.task);
    this.handleEdit();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCompletion(){
      this.props.completion(this.props.id)
  }

  render() {
    let aux;
    if (this.state.isForm) {
      aux = (
        <div>
          <form onSubmit={this.handleSave}>
            <input
              type="text"
              id="task"
              name="task"
              value={this.state.task}
              onChange={this.handleChange}
            />
            <button>Save</button>
          </form>
        </div>
      );
    } else
      aux = (
        <div>
          <li className={this.props.isCompleted ? 'completed' : ''} onClick={this.handleCompletion}>{this.props.task}</li>
          <button onClick={this.handleEdit}>E</button>
          <button onClick={this.handleRemove}>X</button>
        </div>
      );

    return aux;
  }
}

export default Todo;
