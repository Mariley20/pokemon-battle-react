import React, { Component } from 'react'
import CardPokemon from './../components/CardPokemon'
import vulpixImg from './../images/037.png'
import ninetalesImg from './../images/038.png'
import mewImg from './../images/151.png'
import chikoritaImg from './../images/152.png'
import espeonImg from './../images/196.png'
import glameowImg from './../images/431.png'
import glaceonImg from './../images/471.png'

class PokemonBattle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [
        { id: 1, name: 'Vulpix', lifeTime: 150, attack: 45, imgSrc: vulpixImg, selected: false },
        { id: 2, name: 'Ninetales', lifeTime: 150, attack: 50, imgSrc: ninetalesImg, selected: false },
        { id: 3, name: 'Mew', lifeTime: 150, attack: 35, imgSrc: mewImg, selected: false },
        // { id: 4, name: 'Chikorita', lifeTime: 150, attack: 55, imgSrc: chikoritaImg, selected: false },
        { id: 5, name: 'Espeon', lifeTime: 150, attack: 40, imgSrc: espeonImg, selected: false },
        { id: 6, name: 'Glameow', lifeTime: 150, attack: 48, imgSrc: glameowImg, selected: false },
        { id: 7, name: 'Glaceon', lifeTime: 150, attack: 52, imgSrc: glaceonImg, selected: false },
      ],
      selectedPokemons: [],
      turnoPlayer: null,
      playerOne: null,
      playerTwo: null,
    }
  }

  changeSelectedPokemons (item) {
    const { selectedPokemons } = this.state
    item.id = `${item.id}${selectedPokemons.length}`

    if (selectedPokemons.length < 2) {
      selectedPokemons.push(item);
      this.setState({ selectedPokemons })
    }
  }

  removeSelectedPokemons (item) {
    let { selectedPokemons } = this.state
    const index = selectedPokemons.findIndex(val => val.id === item.id)
    if (selectedPokemons.length <= 1) {
      this.setState({ selectedPokemons: [] })
    } else {
      this.setState({
        selectedPokemons: selectedPokemons.splice(index, 1)
      })
    }
  }

  attackPokemon (item) {
    let { selectedPokemons } = this.state
    const turnoPlayer = this.state.turnoPlayer || item

    if (selectedPokemons.length < 2) {
      alert('Seleccione contrincante')
      return false
    }

    let playerTwo = selectedPokemons.find(val => val.id !== item.id)
    selectedPokemons.forEach(val => {
      if (val.id === playerTwo.id) {
        val.lifeTime = val.lifeTime - turnoPlayer.attack
      }
    })

    if (playerTwo.lifeTime > 0) {
      this.setState({ selectedPokemons })
      this.setState({ turnoPlayer: playerTwo })
    } else {
      turnoPlayer.winner = true
      this.setState({ selectedPokemons: [turnoPlayer] })
    }
  }

  render () {
    const pokemons = JSON.parse(JSON.stringify(this.state.pokemons))
    const { selectedPokemons } = this.state
    const { turnoPlayer } = this.state
    return (
      <>
        <div className="cards">
          {
            pokemons.map((pokemon, i) => {
              return <CardPokemon {...pokemon} key={i} >
                <button
                  className="primary"
                  disabled={pokemon.selected}
                  onClick={() => this.changeSelectedPokemons(pokemon)}
                >SELECCIONAR</button>
              </CardPokemon>
            })
          }
        </div>
        <hr />
        <div className="cards">
          {
            selectedPokemons.map((pokemon, j) => {
              return <CardPokemon {...pokemon} key={j} >
                <button
                  className="success"
                  disabled={turnoPlayer && pokemon.id !== turnoPlayer.id}
                  onClick={() => this.attackPokemon(pokemon)}
                >ATACAR</button>
                <button
                  className="danger"
                  disabled={turnoPlayer && pokemon.id !== turnoPlayer.id}
                  onClick={() => this.removeSelectedPokemons(pokemon)}
                >REMOVER</button>
              </CardPokemon>
            })
          }
        </div>
      </>
    )
  }
}

export default PokemonBattle