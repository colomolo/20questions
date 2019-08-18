import React, { Component } from 'react'
import io from 'socket.io-client'

import Riddler from '../Riddler/Riddler'
import Questioner from '../Questioner/Questioner'

class App extends Component {
  constructor(props) {
    super(props)

    this.socket = io()
    this.playerId = props.playerId

    this.state = { role: '', questions: [], winner: '', word: '' }
  }

  componentDidMount() {
    this.socket.emit('playerId', this.props.playerId)

    this.socket.on('role', (role) => {
      this.setState({ role })
    })

    this.socket.on('questions', (questions) => {
      this.setState({ questions })
    })

    this.socket.on('winner', (winner) => {
      this.setState({ winner })
    })

    this.socket.on('getWord', (word) => {
      this.setState({ word })
    })
  }

  render() {
    if (!this.state.role) return null

    return (
      <div className="App">
        <h1>Welcome to the 20 questions game!</h1>

        { this.state.role === 'riddler' &&
          <Riddler
            playerId={ this.props.playerId }
            socket={ this.socket }
            word={ this.state.word }
            questions={ this.state.questions }
            winner={ this.state.winner }
          />
        }

        { this.state.role === 'questioner' &&
          <Questioner
            playerId={ this.props.playerId }
            socket={ this.socket }
            wordIsSet={ this.state.word.length }
            questions={ this.state.questions }
            winner={ this.state.winner }
          />
        }
      </div>
    )
  }
}

export default App
