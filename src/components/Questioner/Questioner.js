import React, { Component } from 'react'

import QuestionsList from '../QuestionsList/QuestionsList'
import Question from '../Question/Question'

class Questioner extends Component {
  constructor(props) {
    super(props)

    this.state = { currentQuestion: '' }

    this.handleInput = this.handleInput.bind(this)
    this.sendQuestion = this.sendQuestion.bind(this)
  }

  get isLastQuestionAnswered() {
    if (!this.props.questions.length) return false

    const lastQuestion = this.props.questions.slice(-1)[0]

    return lastQuestion.text && lastQuestion.answer && lastQuestion.answer.length
  }

  handleInput(event) {
    this.setState({ currentQuestion: event.target.value })
  }

  sendQuestion() {
    const questions = [...this.props.questions, { text: this.state.currentQuestion, answer: '' }]

    this.props.socket.emit('questions', this.props.playerId, questions)
    this.setState({ currentQuestion: '' })
  }

  render() {
    return (
      <div className="Questioner">
        <p>You're the Questioner. Try to guess the word, that Riddler think of!</p>
        <p>You can ask no more than 20 Yes/No questions.</p>

        <QuestionsList questions={ this.props.questions } />

        { this.props.winner === 'questioner' &&
          <h2 class="won">Yay! You guessed the word. Good job!</h2>
        }

        { this.props.winner === 'riddler' &&
          <h2 class="lost">You've lost! Try harder next time.</h2>
        }

        { !!this.props.wordIsSet && (!this.props.questions.length || this.isLastQuestionAnswered) &&
          <form onSubmit={ this.sendQuestion }>
            <label>Ask a question or write a word you think of:</label>
            <br />
            <input
              value={ this.state.question }
              onChange={ this.handleInput }
            />
            <button className="Questioner-ask">Ask question</button>
          </form>
        }
      </div>
    )
  }
}

export default Questioner
