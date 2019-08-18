import React from 'react'

import './Question.css'

const Question = (props) => {
  return (
    <div className="Question">
      <div className="Question-text">
        <span>{ props.index + 1 }. </span>
        { props.question.text }
      </div>

      { props.question.answer &&
        <div className="Question-answer">{ props.question.answer }</div>
      }
    </div>
  )
}

export default Question
