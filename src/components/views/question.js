import React from 'react'

// Change? Clickable view handles this already
export function QuestionDisplay (props) {
    let htmlOutput = []

    props.questions.forEach(entry => {
        let date = new Date(entry.q_creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}
        
        htmlOutput.push(
            <div className="headline" id={entry.q_id}>
                <span className="mainText">{entry.q_text}</span>
                <span className="author">{entry.q_author}</span>
                <span className="date">{date.toLocaleString('en-US', options)}</span>
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