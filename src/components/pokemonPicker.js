import React, { Component } from "react";
import PokemonTypesMap from "../constants/pokemonTypes";

class PokemonPicker extends Component {
  render() {
    return (
      <select
        className="pokemonPicker"
        id={this.props.id}
        onChange={this.props.handleChange}
        value={this.props.choice}
      >
        {this.props.list.map((data, index) => {
          return (
            <option key={index} value={data.value}>
              {data.name}
            </option>
          );
        })}
      </select>
    );
  }
}

export default PokemonPicker;
