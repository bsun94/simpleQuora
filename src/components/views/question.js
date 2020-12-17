import React from 'react'

// Change? Clickable view handles this already
export function QuestionDisplay (props) {
    let htmlOutput = []

    props.questions.forEach(entry => {
        htmlOutput.push(
            <div className="headline" id={entry.q_id}>
                <span className="mainText">{entry.q_text}</span>
                <span className="author">{entry.q_author}</span>
                <span className="date">{entry.q_creation_time}</span>
                <span className="votes">{entry.q_votes}</span>
            </div>
        )
    });
    
    return (
        <div>
            {htmlOutput}
        </div>
    )
}