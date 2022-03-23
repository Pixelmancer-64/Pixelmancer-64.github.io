import React, { Component } from "react";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import Shades from "./Shades";
import PaletteForm from "./PaletteForm";
import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";
import { Route, Routes } from "react-router-dom";

class App extends Component {
  constructor(...props) {
    super(...props);

    this.getPalette = this.getPalette.bind(this);
  }

  findPalette(id) {
    return seedColors.find((e) => e.id === id);
  }

  getPalette(id) {
    const found = this.findPalette(id);
    return found ? generatePalette(found) : false;
  }

  render() {
    return (
      <Routes>
        <Route exact path="/" element={<PaletteList palettes={seedColors} />} />
        <Route
          exact
          path="/new"
          element={<PaletteForm/>}
        />
        <Route
          exact
          path="/palette/:id"
          element={<Palette getPalette={this.getPalette} />}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          element={<Shades getPalette={this.getPalette} />}
        />
      </Routes>
    );
  }
}

export default App;
