import React, { Component } from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import styles from './styles/Navbar'
import { withStyles } from "@material-ui/styles";

import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Close } from "@material-ui/icons";

class Navbar extends Component {
  static defaultProps = {
    message: {
      select: {
        msg: 'Format changed to: ',
        more: 'hex'
      },

      button: {
        msg: 'Copied ',
        more: 'array!'
      }
    } 
  }
  constructor(...props) {
    super(...props);
    this.state = {
      format: "hex",
      open: false,
      message: this.props.message.select
    };

    this.handleChange = this.handleChange.bind(this);
    this.closeSnackBar = this.closeSnackBar.bind(this);
    this.copyArray = this.copyArray.bind(this);
    this.openSnackBar = this.openSnackBar.bind(this);
  }

  copyArray() {
    navigator.clipboard.writeText(JSON.stringify(this.props.array));
    this.setState({message: this.props.message.button})
    this.openSnackBar()
  }

  handleChange(e) {
    const format = e.target.value;
    this.setState({ format, message: {
      msg: this.props.message.select.msg,
      more: format
    }});
    this.props.changeFormat(format);
    this.openSnackBar()
  }

  openSnackBar(){
    this.setState({ open: true });
  }

  closeSnackBar() {
    this.setState({ open: false });
  }

  render() {
    const { level } = this.props;
    return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">ColorPicker</Link>
        </div>
        {level ? (
          <div className="Slider-container">
            <span>Level: {level}</span>
            <div className="Slider">
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                onAfterChange={this.props.handleChange}
                step={100}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="Navbar-select">
          <Button variant="outlined" onClick={this.copyArray}>
            Copy Array
          </Button>
          
          <Select value={this.state.format} onChange={this.handleChange}>
            {this.props.formats.map((e) => (
              <MenuItem
                value={e.value}
                key={e.value}
              >{`${e.value} - ${e.desc}`}</MenuItem>
            ))}
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          key="message"
          open={this.state.open}
          autoHideDuration={1500}
          message={
            <span key="SnackBar" id="message" className="Snackbar">
              {this.state.message.msg}<span key="Format">{this.state.message.more}</span>
            </span>
          }
          ContentProps={{
            "aria-describedby": "message",
          }}
          onClose={this.closeSnackBar}
          action={[
            <IconButton key="closeIcon" onClick={this.closeSnackBar}>
              <Close key="close" aria-label="close" />
            </IconButton>,
          ]}
        />
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
