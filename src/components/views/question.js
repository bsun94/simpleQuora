import React from 'react'
import { Voters } from '../controllers/voteQuestions.js'

export function QuestionDisplay (props) {
    let htmlOutput = []

    props.questions.forEach(entry => {
        let date = new Date(entry.q_creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}
        
        htmlOutput.push(
            <div className="headline question-headline">
                <Voters id={entry.q_id} votes={entry.q_votes} getQ={props.getQ} />
                
                <div className="textBody">
                    <div className="author">{entry.q_author} asked:</div>
                    <div className="mainText">{entry.q_text}</div>
                    <div className="date">on {date.toLocaleString('en-US', options)}</div>
                </div>
            
            </div>
        )
    });
    
    return (
        <div>
            {htmlOutput}
        </div>
    )
}
