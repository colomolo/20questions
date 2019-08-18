import React, { Component } from 'react'

class AnswerButtons extends Component {
  constructor(props) {
    super(props)

    this.sendYes = this.sendYes.bind(this)
    this.sendNo = this.sendNo.bind(this)
  }

  get latestQuestion() {
    if (!this.props.questions.length) return false

    const lastQuestion = this.props.questions.slice(-1)

    return lastQuestion.text && lastQuestion.answer
  }

  sendYes() {
    this.props.onAnswer('Yes')
  }

  sendNo() {
    this.props.onAnswer('No')
  }

  render() {
    return (
      <div className="AnswerButtons">
        <button onClick={ this.sendYes }>Yes</button>
        <button onClick={ this.sendNo }>No</button>
      </div>
    )
  }
}

export default AnswerButtons
