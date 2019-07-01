import React, { Component } from "react";
import PokemonTypesMap from "../constants/pokemonTypes";

class PokemonCard extends Component {
  render() {
    if (this.props.pokemon) {
      var arrowUp = <span className="arrows">&#8593;</span>;
      var arrowDown = <span className="arrows">&#8595;</span>;

      var comparisonArray = null;
      if (this.props.vs) {
        comparisonArray = [];
        this.props.pokemon.stats.map((item, index) =>
          comparisonArray.push(item.base_stat - this.props.vs.stats[index].base_stat)
        );
      }
      return (
        <div className="pokemonCard">
          <h1 className="pokemonName">{this.props.pokemon.name}</h1>
          <div className="pokemonImageContainer">
            <img
              className="pokemonImage"
              src={this.props.pokemon.sprites.front_default}
            />
          </div>
          <div className="pokemonTypes">
            {this.props.pokemon.types.map((item, index) => {
              var myTypeStyle = {
                backgroundColor: PokemonTypesMap[item.type.name]
              };
              return (
                <label className="type" style={myTypeStyle} key={index}>
                  {item.type.name}
                </label>
              );
            })}
          </div>
          <hr />
          <div className="pokemonStats">
            {this.props.pokemon.stats.map((item, index) => {
              var arrow = null;
              var arrowStyle = null;
              var color = null;
              if (comparisonArray) {
                if (comparisonArray[index] > 0) {
                  color = "green";
                  arrow = arrowUp;
                } else if (comparisonArray[index] < 0) {
                  color = "red";
                  arrow = arrowDown;
                }
                arrowStyle = { color };
              }

              return (
                <div className="stat" key={index}>
                  <h3 className="statName">{item.stat.name}</h3>
                  <div style={arrowStyle} className="statNumber">
                    <span>{item.base_stat}</span>
                    {arrow}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="pokemonCard pokemonCard--Empty">
          <h1>POKEMON!</h1>
          <img
            className="pokeball"
            src="https://img.icons8.com/color/48/000000/pokeball-2.png"
          />
        </div>
      );
    }
  }
}

export default PokemonCard;
