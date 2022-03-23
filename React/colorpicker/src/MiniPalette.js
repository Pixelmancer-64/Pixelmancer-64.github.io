import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from './styles/MiniPalette'

function MiniPalette(props) {
  const { classes, paletteName, colors } = props;
  return (
    <div className={classes.root} onClick={props.handleClick}>
      <div className={classes.colors}>
        {colors.map((e) => (
          <div
            className={classes.miniColors}
            key={e.name}
            style={{ backgroundColor: e.color }}
          ></div>
        ))}
      </div>
      <h2 className={classes.title}>{paletteName}</h2>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
