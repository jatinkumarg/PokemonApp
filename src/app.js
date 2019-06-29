import React, { Component } from 'react';
import axios from 'axios';
import PokemonList from './constants/pokemonList';
import PokemonTypesMap from './constants/pokemonTypes';

function PokemonCard(props) {
    if (props.pokemon) {
        var arrowUp = <span className='arrows'>&#8593;</span>;
        var arrowDown = <span className='arrows'>&#8595;</span>;

        var comparisonArray = null;
        if(props.vs) {
            comparisonArray = [];
            props.pokemon.stats.map( (item, index) => comparisonArray.push(item.base_stat - props.vs.stats[index].base_stat) )
        }

        return (
            <div  className='pokemonCard'>
                <h1 className='pokemonName'>{props.pokemon.name}</h1>
                <div className='pokemonImageContainer'>
                    <img className='pokemonImage' src={props.pokemon.sprites.front_default}></img>
                </div>
                <div className='pokemonTypes'>
                    {
                        props.pokemon.types.map ((item, index) => { 
                            var myTypeStyle = { backgroundColor: PokemonTypesMap[item.type.name] };
                            return (<label className='type' style={myTypeStyle} key={index}>{item.type.name}</label>)
                        })
                    }
                </div>
                <hr/>
                <div className='pokemonStats'>
                    {
                        props.pokemon.stats.map( (item, index ) => {
                            var arrow = null;
                            var arrowStyle = null;
                            var color = null;
                            if(comparisonArray) {
                                if(comparisonArray[index] > 0) {
                                    color = 'green';
                                    arrow = arrowUp;
                                }
                                else if(comparisonArray[index] < 0) {
                                    color = 'red';
                                    arrow = arrowDown;
                                }
                                arrowStyle = { color };
                            }

                            return (
                                <div className='stat' key={index}>
                                    <h3 className='statName'>{item.stat.name}</h3>
                                    <div style={arrowStyle} className='statNumber'>
                                        <span>{item.base_stat}</span>
                                        {arrow}
                                    </div>                            
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='pokemonCard pokemonCard--Empty'>
            <h1>POKEMON!</h1>
                <img className='pokeball' src="https://img.icons8.com/color/48/000000/pokeball-2.png"></img>
            </div>
        );
    } 
}

function PokemonPicker(props) {
    return (
        <select className='pokemonPicker' 
        id={props.id} 
        onChange={props.handleChange} 
        value={props.choice}>
            {
                props.list.map ( (data, index) => { 
                    return <option key={index} value={data.value}>{data.name}</option>;
                })
            }                        
        </select>
    );
}

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
            <div className='container'>
                <section className='cardSection'>
                    <PokemonPicker id='pokemonOne' handleChange={this.handleChange} list={PokemonList} choice={this.state.PokemonOne} />
                    <PokemonCard pokemon={this.state.PokemonOneData} />
                </section>
                <section className='cardSection'>
                    <PokemonPicker id='pokemonTwo' handleChange={this.handleChange} list={PokemonList} choice={this.state.PokemonTwo} />
                    <PokemonCard pokemon={this.state.PokemonTwoData} vs={this.state.PokemonOneData} />
                </section>
            </div>
        );
    }

    handleChange(event) {
        if(event.target.id === 'pokemonOne')
            this.setState({ PokemonOne: event.target.value }, () => this.loadPokemonOneData());
        if(event.target.id === 'pokemonTwo')
            this.setState({ PokemonTwo: event.target.value }, () => this.loadPokemonTwoData());
    }

    loadPokemonOneData() {
        this.getPokemon(this.state.PokemonOne).then( res => {
            this.setState({ PokemonOneData: res.data });
        });
    }

    loadPokemonTwoData() {
        this.getPokemon(this.state.PokemonTwo).then( res => {
            this.setState({ PokemonTwoData: res.data });
        });
    }

    getPokemon(id) {
        return axios.get(this.pokeAPI.host+`pokemon/${id}`);
    }
}
