import React, { Component } from 'react'

import './Questioner.css'

import QuestionsList from '../QuestionsList/QuestionsList'
import Question from '../Question/Question'
import NewGameButton from '../NewGameButton/NewGameButton'

class Questioner extends Component {
  constructor(props) {
    super(props)

    this.state = { currentQuestion: '', word: '' }

    this.handleWordInput = this.handleWordInput.bind(this)
    this.handleQuestionInput = this.handleQuestionInput.bind(this)
    this.sendQuestion = this.sendQuestion.bind(this)
    this.guessWord = this.guessWord.bind(this)
  }

  get isLastQuestionAnswered() {
    if (!this.props.questions.length) return false

    const lastQuestion = this.props.questions.slice(-1)[0]

    return lastQuestion.text && lastQuestion.answer && lastQuestion.answer.length
  }

  handleWordInput(event) {
    this.setState({ word: event.target.value })
  }

  handleQuestionInput(event) {
    this.setState({ currentQuestion: event.target.value })
  }

  sendQuestion() {
    const questions = [...this.props.questions, { text: this.state.currentQuestion, answer: '' }]

    this.props.socket.emit('questions', this.props.playerId, questions)
    this.setState({ currentQuestion: '' })
  }

  guessWord() {
    this.props.socket.emit('guessWord', this.props.playerId, this.state.word)
  }

  render() {
    return (
      <div className="Questioner">
        <p>You're the Questioner. Try to guess the word, that Riddler think of!</p>
        <p>You can ask no more than 20 Yes/No questions.</p>

        { !!this.props.wordIsSet && !this.props.winner &&
          <form className="Questioner-guessWordForm" onSubmit={ this.guessWord }>
            <input
              value={ this.state.word }
              onChange={ this.handleWordInput }
              className="Questioner-guessWordInput"
              placeholder="Know the word?"
            />
            <button className="Questioner-guessWordButton">Guess</button>
          </form>
        }

        <QuestionsList questions={ this.props.questions } />

        { this.props.winner === 'questioner' &&
          <h2 class="won">Yay! You guessed the word. Good job!</h2>
        }

        { this.props.winner === 'riddler' &&
          <h2 class="lost">You've lost! Try harder next time.</h2>
        }

        { this.props.winner &&
          <NewGameButton socket={ this.props.socket } />
        }

        { !!this.props.wordIsSet &&
          (!this.props.questions.length || this.isLastQuestionAnswered) &&
          !this.props.winner &&
          <form onSubmit={ this.sendQuestion }>
            <label>Ask a question or write a word you think of:</label>
            <br />
            <input
              value={ this.state.question }
              onChange={ this.handleQuestionInput }
            />
            <button className="Questioner-ask">Ask question</button>
          </form>
        }
      </div>
    )
  }
}

export default Questioner
