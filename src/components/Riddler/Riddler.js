import React, { Component } from 'react'

import QuestionsList from '../QuestionsList/QuestionsList'
import Question from '../Question/Question'
import AnswerButtons from '../AnswerButtons/AnswerButtons'
import NewGameButton from '../NewGameButton/NewGameButton'

class Riddler extends Component {
  constructor(props) {
    super(props)

    this.state = { word: props.word }

    this.saveWord = this.saveWord.bind(this)
    this.sendAnswer = this.sendAnswer.bind(this)
  }

  get isLastQuestionAnswered() {
    if (!this.props.questions.length) return false

    const lastQuestion = this.props.questions.slice(-1)[0]

    return lastQuestion.text && lastQuestion.answer
  }

  saveWord(event) {
    this.setState({ word: this.input.value }, () => {
      this.props.socket.emit('saveWord', this.props.playerId, this.state.word)
    })
  }

  sendAnswer(answer) {
    const questions = [...this.props.questions]
    questions[questions.length - 1].answer = answer

    this.props.socket.emit('questions', this.props.playerId, questions)
  }

  render() {
    return (
      <div className="Riddler">
        <p>You're the Riddler. Your opponent (The Questioner) will try to guess the word by asking Yes/No questions.</p>
        
        { !this.props.word &&
          <form onSubmit={ this.saveWord }>
            <label htmlFor="wordInput">Please write a word: </label>
            <br />
            <input
              ref={ input => this.input = input }
              id="wordInput"
              type="text"
            />
            <button>OK</button>
          </form>
        }

        { this.props.word &&
          <h2>Word: { this.props.word }</h2>
        }

        <QuestionsList questions={ this.props.questions } />

        { this.props.winner === 'riddler' &&
          <h2 className="won">Yay! You won! Questioner could not guess the word</h2>
        }

        { this.props.winner === 'questioner' &&
          <h2 className="lost">You've lost! Questioner guessed the word.</h2>
        }

        { this.props.winner &&
          <NewGameButton socket={ this.props.socket } />
        }

        { !this.props.winner && !!this.props.questions.length && !this.isLastQuestionAnswered &&
          <AnswerButtons socket={ this.props.socket } onAnswer={ this.sendAnswer } />
        }
      </div>
    )
  }
}

export default Riddler
