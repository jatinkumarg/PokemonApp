import React, { Component } from "react";
import axios from "axios";
import PokemonList from "./constants/pokemonList";
import PokemonTypesMap from "./constants/pokemonTypes";
import PokemonPicker from "./components/pokemonPicker";
import PokemonCard from "./components/pokemonCard";
//https://i.ibb.co/fH9BfTJ/bg.jpg
//https://i.ibb.co/kghC6pG/yyy.jpg
//https://i.ibb.co/Tw31fBm/yellow.jpg
class App extends Component {
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
    const headstyle = {
      color: "white",
      fontSize: 40
    };
    const substyle = {
        color: "white",
        fontSize: 25
      };
    const mainstyle = {
        textAlign: "center"
      };
    return (
      <div style={mainstyle}>
        <div className="body">
          <h1 style={headstyle}>Pokedex</h1>
          <h3 style={substyle}>You very own pokemon catalog and pokemon</h3>
        </div>
        <div >
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
export default App;
