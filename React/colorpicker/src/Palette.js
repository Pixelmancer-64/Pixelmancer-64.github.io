import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/Palette";
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
      level: 500,
      format: "hex",
      colorsArray: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
    this.getArray = this.getArray.bind(this);
  }

  handleChange(level) {
    this.setState(
      {
        level,
      },
      () => this.getArray()
    );
  }

  componentDidMount() {
    this.getArray();
  }

  getArray() {
    const colorsArray = this.props.colors[this.state.level].map(
      (e) => e[this.state.format]
    );
    this.setState({
      colorsArray,
    });
  }

  changeFormat(format) {
    this.setState({ format }, () => this.getArray());
  }

  render() {
    const { level } = this.state;
    return (
      <div className="Palette">
        <Navbar
          level={level}
          handleChange={this.handleChange}
          array={this.state.colorsArray}
          changeFormat={this.changeFormat}
          formats={this.props.formats}
        />
        <div className="Palette-colors">
          {this.props.colors[level].map((e) => (
            <ColorBox
              background={e[this.state.format]}
              id={e.id}
              name={e.name}
              key={e.id}
              showLink={true}
            />
          ))}
        </div>
        <footer className="Palette-footer">
          <span>{this.props.paletteName}</span>
        </footer>
      </div>
    );
  }
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const aux = props.getPalette(params.id);
  if (aux) {
    props = { ...props, ...aux };
    return <WrappedComponent {...props} params={params} />;
  }
  return <h1>404</h1>;
};

export default withStyles(styles)(withRouter(Palette));
