import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IroColorPicker from "./IroColorPicker";
import iro from "@jaames/iro";
import { Link } from 'react-router-dom'

const drawerWidth = 360;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  inside: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

class PaletteForm extends Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  constructor(...props) {
    super(...props);

    this.state = {
      color: "hsla(360, 0%, 100%, 1)",
      colorString: 'hsla(360, 0%, 100%, 1)'
    };

    this.onColorChange = this.onColorChange.bind(this);
  }

  onColorChange(color) {
    this.setState({ color: color.hsla, colorString: color.hexString });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
            <Link style={{ color: "inherit", textDecoration: "inherit" }} to='/'>
                ColorPicker
            </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <Divider />

          {/* AQUI QUE COMEÇA */}

          <div className={classes.inside}>
          <h1 style={{backgroundColor: this.state.colorString, color: "transparent", backgroundClip: "text",}}>Palette Generator</h1>
          <div>
            <IroColorPicker
              color={this.state.color}
              onColorChange={this.onColorChange}
              layout={[
                {
                  component: iro.ui.Wheel,
                },
                {
                  component: iro.ui.Slider,
                  options: {
                    sliderType: "hue",
                  },
                },
                {
                  component: iro.ui.Slider,
                  options: {
                    sliderType: "saturation",
                  },
                },
                {
                  component: iro.ui.Slider,
                  options: {
                    sliderType: "value",
                  },
                },
                {
                  component: iro.ui.Slider,
                  options: {
                    sliderType: "alpha",
                  },
                },
              ]}
            />
            </div>
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteForm);
