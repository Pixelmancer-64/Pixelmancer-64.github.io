import React, {Component} from 'react';
class Pokecard extends Component {
    render(){
        return <div className='Pokecard'>
            <h1>{this.props.name}</h1>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`} alt='pokemon'/>
            <h2>{this.props.type}</h2>
            <h2>{this.props.exp}</h2>
        
        </div>
        
    }
}

export default Pokecard;