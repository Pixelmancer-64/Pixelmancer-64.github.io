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
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import ColorRect from "./ColorRect";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useParams, useNavigate } from "react-router-dom";
import chroma from "chroma-js";

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
    display: "flex",
    padding: "0 24px",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    padding: "0",
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
  },
  content: {
    flexGrow: 1,
    height: `calc(100vh - 64px)`,
    padding: theme.spacing(3),
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
    gap: " 2rem ",
  },

  palleteColors: {
    backgroundColor: "white",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
    borderRadius: "5px",
    overflow: "hidden",
  },

  moreOptions: {
    display: "flex",
    gap: "1rem",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
  },

  paletteName: {
    marginLeft: "auto",
  },

  navForm: {
    display: "flex",
    gap: "1rem",
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
      color: "rgba(255,255,255,1)",
      colorString: "rgba(255,255,255,1)",
      colorsArray: [],
      name: "",
      paletteName: "",
    };

    this.onColorChange = this.onColorChange.bind(this);
    this.addColor = this.addColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.randomColor = this.randomColor.bind(this);
    this.deleteBox = this.deleteBox.bind(this);
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  onColorChange(color) {
    this.setState({ color: color.hsla, colorString: color.hslaString });
  }

  addColor() {
    const { colorString, name } = this.state;
    this.setState({
      colorsArray: [...this.state.colorsArray, { color: colorString, name }],
    });
  }

  randomColor() {
    const color = chroma.random().css("hsla");
    this.setState({ color: color, colorString: color });
  }

  deleteBox(id) {
    this.setState({
      colorsArray: this.state.colorsArray.filter(
        (e) => e.name.toLowerCase() !== id.toLowerCase()
      ),
    });
  }

  savePalette() {
    const { paletteName } = this.state;
    this.props.savePalette({
      paletteName,
      id: paletteName.replace(/ /g, "-"),
      colors: this.state.colorsArray,
    });
    this.props.navigate("/");
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isUnicName", (value) => {
      return !this.state.colorsArray.find(
        (e) => e.name.toLowerCase() === value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule("isUnicColor", (value) => {
      return !this.state.colorsArray.find(
        (e) => e.color === this.state.colorString
      );
    });

    ValidatorForm.addValidationRule("isUnicPaletteName", (value) => {
      return !this.props.palettes.find(
        (e) => e.paletteName.toLowerCase() === value.toLowerCase()
      );
    });
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
              <Link
                style={{ color: "inherit", textDecoration: "inherit" }}
                to="/"
              >
                ColorPicker
              </Link>
            </Typography>
            <div className={classes.paletteName}>
              <ValidatorForm onSubmit={this.savePalette}>
                <div className={classes.navForm}>
                  <TextValidator
                    label="Palette name"
                    value={this.state.paletteName}
                    validators={["required", "isUnicPaletteName"]}
                    errorMessages={[
                      "This field is required!",
                      "Palette name already in use!",
                    ]}
                    onChange={(e) =>
                      this.setState({ paletteName: e.target.value })
                    }
                  />
                  <Button variant="contained" color="secondary" type="submit">
                    Save Palette
                  </Button>
                </div>
              </ValidatorForm>
            </div>
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
            <h1
              style={{
                backgroundColor: this.state.colorString,
                color: "transparent",
                backgroundClip: "text",
              }}
            >
              Palette Generator
            </h1>

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
            <ValidatorForm onSubmit={this.addColor}>
              <div className={classes.form}>
                <TextValidator
                  value={this.state.name}
                  validators={["required", "isUnicName", "isUnicColor"]}
                  errorMessages={[
                    "This field is required!",
                    "Name already in use!",
                    "Color already in use!",
                  ]}
                  onChange={this.handleChange}
                />
                <Button variant="contained" color="primary" type="submit">
                  Add color
                </Button>
              </div>
            </ValidatorForm>

            <div className={classes.moreOptions}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.setState({ colorsArray: [] })}
              >
                Clear palette
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.randomColor}
              >
                Random color
              </Button>
            </div>
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <div className={classes.palleteColors}>
            {this.state.colorsArray.map((e) => (
              <ColorRect
                backgroundColor={e.color}
                delete={this.deleteBox}
                key={e.name}
                name={e.name}
                id={e.name}
              />
            ))}
          </div>
        </main>
      </div>
    );
  }
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();

  props = { ...props };
  return <WrappedComponent {...props} params={params} navigate={navigate} />;
};

export default withStyles(styles, { withTheme: true })(withRouter(PaletteForm));
