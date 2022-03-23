import React, { Component } from "react";
import Card from "./Card";

const url = "https://deckofcardsapi.com/api/deck/";

class Deck extends Component {
  constructor(...props) {
    super(...props);
    this.state = { deck: null, drawnCards: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    if (this.state.deck.remaining === 0) {
      alert("acabou mano, n te mais carta");
    } 
    else {
      const response = await (
        await fetch(url + `${this.state.deck.deck_id}/draw`)
      ).json();
      const card = response.cards[0];
      this.setState({
        drawnCards: [
          ...this.state.drawnCards,
          {
            id: card.code,
            img: card.image,
            name: `${card.value} of ${card.suit}`,
          },
        ],
        deck: {
          remaining: response.remaining,
          deck_id: response.deck_id
        },
      });
    }
  }

  async componentDidMount() {
    const response = await (await fetch(url + "new/shuffle")).json();
    const { deck_id, remaining } = response;
    this.setState({ deck: { deck_id, remaining } });
  }

  render() {
    return (
      <div>
        <h1>Card Deck</h1>
        <button onClick={this.handleClick}>Get another card!</button>
        {this.state.drawnCards.map(e=> <Card key={e.id} src={e.img} alt={e.name}/>)}
      </div>
    );
  }
}

export default Deck;
