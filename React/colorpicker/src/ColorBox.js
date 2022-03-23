import React, { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import styles from "./styles/ColorBox";
import { withStyles } from "@material-ui/styles";

class ColorBox extends Component {
  constructor(...props) {
    super(...props);
    this.state = { copied: false };

    this.copy = this.copy.bind(this);
  }

  copy() {
    navigator.clipboard.writeText(this.props.background.replace(/,/g, ", "));
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1000);
    });
  }

  render() {
    const { name, background, showLink } = this.props;
    const relativeColor = chroma(background).luminance() > 0.3 ? 0 : 255;
    const opositeColor = chroma(background).luminance() > 0.3 ? 255 : 0;

    const color = {
      color: `rgb(${relativeColor}, ${relativeColor}, ${relativeColor})`,
    };

    const colorWithBackground = {
      ...color,
      background: `rgba(${opositeColor}, ${opositeColor}, ${opositeColor}, .4)`,
    };

    return (
      <div style={{ background }} onClick={this.copy} className="ColorBox">
        <div
          style={{ background }}
          className={`ColorBox-overlay ${this.state.copied ? "show" : ""}`}
        />
        <div
          style={color}
          className={`copy-msg ${this.state.copied ? "show" : ""}`}
        >
          <h1 style={colorWithBackground}>Copied!</h1>
          <p>{this.props.background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span style={color}>{name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        {showLink ? (
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={`/palette/${this.props.params.id}/${this.props.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              style={colorWithBackground}
              className="see-more"
              onClick={this.redirectToShades}
            >
              More
            </span>
          </Link>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const navigate = useNavigate();

  return <WrappedComponent {...props} params={params} navigate={navigate} />;
};
export default withStyles(styles)(withRouter(ColorBox));
