import React from 'react'

import Question from '../Question/Question'

const QuestionsList = ({ questions }) => {
  return (
    <div className="QuestionsList">
      {
        questions.map((question, index) => {
          return <Question key={ index } index={ index } question={ question } />
        })
      }
    </div>
  )
}

export default QuestionsList

