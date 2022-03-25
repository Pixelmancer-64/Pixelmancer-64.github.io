import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@material-ui/core/IconButton";
import chroma from "chroma-js";

const styles = {
  root: {
    flexBasis: "20%",
    flex: "1",
    display: "flex",
    position: "relative",
    "&:hover": {
      '& svg':{
        transform: "scale(1.5)",
      }
    },
  '& svg': {
	  willChange: 'scale',
    transition: 'transform 0.3s ease-in-out',
  },
  },

  boxContent: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    padding: ".4rem",
    letterSpacing: "1px",
    fontSize: ".5rem",
    textTransform: "uppercase",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h1": {
      margin: "0",
    },
  },

};

class ColorRect extends Component {
  render() {
    const color =
      chroma(this.props.backgroundColor).luminance() > 0.3
        ? "rgba(0,0,0,.6)"
        : "rgba(255,255,255, .6)";
    const { classes } = this.props;
    return (
      <div
        className={classes.root}
        style={{ backgroundColor: this.props.backgroundColor }}
      >
        <div style={{ color }} className={classes.boxContent}>
          <h1>{this.props.name}</h1>
          <IconButton onClick={() => this.props.delete(this.props.id)}>
            <DeleteIcon sx={{ color }} />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ColorRect);
