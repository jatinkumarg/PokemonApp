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
      color: '#1c0502',
      fontFamily: 'ITC Benguiat W01',
      textTransform: 'uppercase',
      fontSize: 60,
      marginTop: 4,
      textShadow: '-0.05rem -0.05rem 1px #ed2b12,0.05rem -0.05rem 1px #ed2b12,-0.05rem 0.05rem 1px #ed2b12,0.05rem 0.05rem 1px #ed2b12,0 0 15px #630100,0 0 20px #450100',
      letterSpacing: '-2px'
        };
    const substyle = {
      color: "#FFFF66",
      fontSize: 20,
      marginTop: -35
    };
    const mainstyle = {
      textAlign: "center"
    };
    const cardstyle = {
      marginTop: -20
    };
    return (
      <div style={mainstyle}>
        <div className="body">
          <h1 style={headstyle}>Pokedex</h1>
          <h3 style={substyle}>Your very own pokemon comparer app</h3>
        </div>
        <div style={cardstyle}>
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
