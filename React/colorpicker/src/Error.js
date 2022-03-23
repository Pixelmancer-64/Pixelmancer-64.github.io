import React, { Component } from "react";
import styles from './styles/Error'
import { withStyles } from "@material-ui/styles";


class Error extends Component {
  render() {
    return (
      <div className="Error">
        <h1>{this.props.status}</h1>
        <h2>{this.props.message}</h2>
      </div>
    );
  }
}

export default withStyles(styles)(Error);
