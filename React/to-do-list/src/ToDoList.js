import React, { Component } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

class ToDoList extends Component {
  constructor(...props) {
    super(...props);
    this.state = { todos: [] };
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this)
  }

  removeTask(id) {
    this.setState({ todos: this.state.todos.filter((e) => e.key !== id) });
  }

  addTask(task) {
    this.setState({ todos: [...this.state.todos, task] });
  }

  updateTask(id, task) {
    const todos = this.state.todos.map((e) => {
      if (e.key === id) return { ...e, task };
      return e;
    });
    this.setState({ todos });
  }

  toggleCompletion(id){
    const todos = this.state.todos.map((e) => {
        if (e.key === id) return { ...e, isCompleted: !e.isCompleted };
        return e;
      });
      this.setState({ todos });
  }

  render() {
    return (
      <div>
        <h1>Todo List!</h1>
        <TodoForm add={this.addTask} />
        <ul>
          {this.state.todos.map((e) => (
            <Todo
              key={e.key}
              id={e.key}
              task={e.task}
              isCompleted={e.isCompleted}
              remove={this.removeTask}
              update={this.updateTask}
              completion={this.toggleCompletion}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default ToDoList;
