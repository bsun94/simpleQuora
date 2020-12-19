import React from 'react'
import { Voters } from '../controllers/voteAnswers.js'

export function AnswerDisplay (props) {
    let htmlOutput = []

    props.answers.forEach(entry => {
        let date = new Date(entry.creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}
        
        htmlOutput.push(
            <div className="headline answer-headline" id={entry.id}>
                <Voters id={entry.id} q_id={entry.question} votes={entry.votes} getA={props.getA} />
                
                <div className="textBody">
                    <div className="author">{entry.author} answered:</div>
                    <div className="mainText">{entry.text}</div>
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
