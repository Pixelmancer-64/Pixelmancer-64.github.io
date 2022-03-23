import React, { Component } from "react";
import "./RuleRow.css";

class RuleRow extends Component {
  render() {
    return (
      <tr
        className={
          "RuleRow RuleRow-" +
          (this.props.score === undefined ? "active" : "disabled")
        }
        onClick={this.props.score === undefined ? this.props.doScore : null}
      >
        <td className="RuleRow-name">{this.props.name}</td>
        <td className="RuleRow-score">{this.props.score}</td>
      </tr>
    );
  }
}

export default RuleRow;
