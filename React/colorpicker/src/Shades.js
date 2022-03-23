import React, { Component } from "react";
import { useParams } from "react-router-dom";
import Error from "./Error";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/Shades";

class Palette extends Component {
  static defaultProps = {
    formats: [
      { value: "hex", desc: "#fffff" },
      { value: "rgb", desc: "rgb(255, 255, 255)" },
      { value: "rgba", desc: "rgba(255, 255, 255, 1)" },
      { value: "hsl", desc: "hsl(0, 0%, 100%)" },
    ],
  };

  constructor(...props) {
    super(...props);
    this.state = {
      format: "hex",
      colorsArray: [],
    };

    this.changeFormat = this.changeFormat.bind(this);
    this.getArray = this.getArray.bind(this);
  }

  changeFormat(format) {
    this.setState({ format }, () => this.getArray());
  }

  componentDidMount() {
    this.getArray();
  }

  getArray() {
    const colorsArray = this.props.shades.map((e) => e[this.state.format]);
    this.setState({
      colorsArray,
    });
  }

  render() {
    const { shades, formats, name } = this.props;
    const colors = shades
      .slice(1)
      .map((e) => (
        <ColorBox
          background={e[this.state.format]}
          id={e.id}
          name={e.name}
          key={e.name}
          showLink={false}
        />
      ));
    return (
      <div className="Shades">
        <Navbar
          array={this.state.colorsArray}
          level={false}
          changeFormat={this.changeFormat}
          formats={formats}
        />
        <div className="Shades-colors">{colors}</div>
        <footer className="Shades-footer">
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={`/palette/${this.props.params.paletteId}`}
          >
            <span>{name}</span>
          </Link>
        </footer>
      </div>
    );
  }
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const aux = props.getPalette(params.paletteId);
  const name = aux.paletteName;
  props = { ...props, name };
  if (aux) {
    let shades = [];
    const colors = aux.colors;
    for (let shade in colors) {
      const found = colors[shade].filter((e) => e.id === params.colorId);
      if (found.length !== 0) shades.push(...found);
      else return <Error status={404} message="Color not found!" />;
    }
    props = { ...props, shades };
    return <WrappedComponent {...props} params={params} />;
  }  return <Error status={404} message="Palette not found!" />;
};

export default withStyles(styles)(withRouter(Palette));
