import React, { Component } from "react";
import axios from "axios";
import PokemonList from "./constants/pokemonList";
import PokemonTypesMap from "./constants/pokemonTypes";
import PokemonPicker from "./components/pokemonPicker";
import PokemonCard from "./components/pokemonCard";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PokemonOne: 1,
      PokemonTwo: 2,
      PokemonOneData: null,
      PokemonTwoData: null
    };

    this.pokeAPI = {
      host: "https://pokeapi.co/api/v2/"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadPokemonOneData();
    this.loadPokemonTwoData();
  }

  render() {
    return (
      <div className="container">
        <section className="cardSection">
          <PokemonPicker
            id="pokemonOne"
            handleChange={this.handleChange}
            list={PokemonList}
            choice={this.state.PokemonOne}
          />
          <PokemonCard pokemon={this.state.PokemonOneData} />
        </section>
        <section className="cardSection">
          <PokemonPicker
            id="pokemonTwo"
            handleChange={this.handleChange}
            list={PokemonList}
            choice={this.state.PokemonTwo}
          />
          <PokemonCard
            pokemon={this.state.PokemonTwoData}
            vs={this.state.PokemonOneData}
          />
        </section>
      </div>
    );
  }

  handleChange(event) {
    if (event.target.id === "pokemonOne")
      this.setState({ PokemonOne: event.target.value }, () =>
        this.loadPokemonOneData()
      );
    if (event.target.id === "pokemonTwo")
      this.setState({ PokemonTwo: event.target.value }, () =>
        this.loadPokemonTwoData()
      );
  }

  loadPokemonOneData() {
    this.getPokemon(this.state.PokemonOne).then(res => {
      this.setState({ PokemonOneData: res.data });
    });
  }

  loadPokemonTwoData() {
    this.getPokemon(this.state.PokemonTwo).then(res => {
      this.setState({ PokemonTwoData: res.data });
    });
  }

  getPokemon(id) {
    return axios.get(this.pokeAPI.host + `pokemon/${id}`);
  }
}
