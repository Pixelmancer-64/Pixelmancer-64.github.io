import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./styles/PaletteList";
import { Button } from "@material-ui/core";

const buttonStyles = {
  color: "white",
  border: "1px solid white",
};

class PaletteList extends Component {
  constructor(...props) {
    super(...props);
    this.redirectToPalette = this.redirectToPalette.bind(this);
  }

  redirectToPalette(id) {
    this.props.navigate(`/palette/${id}`);
  }

  render() {
    const { classes, palettes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>ColorPicker</h1>

            <Button variant="outlined" style={buttonStyles} href="/new">
              Create a palette!
            </Button>
          </nav>
          <div className={classes.miniPalettes}>
            {palettes.map((e) => (
              <MiniPalette
                {...e}
                key={`${e.paletteName}-${e.id}`}
                handleClick={() => this.redirectToPalette(e.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return <WrappedComponent {...props} params={params} navigate={navigate} />;
};

export default withRouter(withStyles(styles)(PaletteList));
