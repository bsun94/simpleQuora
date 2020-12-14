import React from 'react'

// Change? Clickable view handles this already
function QuestionDisplay (props) {
    return (
        <div>
            <div className="headline">
                <span className="mainText">{props.question.text}</span>
                <span className="votes">{props.question.netVote}</span>
            </div>

            <div className="children">{formatAnswers(props.answers)}</div>
        </div>
    )
}

export default QuestionDisplay