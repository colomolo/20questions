import React, { Component } from 'react'


class NewGameButton extends Component {
  constructor(props) {
    super(props)

    this.startNewGame = this.startNewGame.bind(this)
  }

  startNewGame() {
    this.props.socket.emit('newGame', this.props.playerId)
  }

  render() {
    return (
      <form onSubmit={ this.startNewGame }>
        <button>One more game?</button>
      </form>
    )
  }
}

export default NewGameButton
