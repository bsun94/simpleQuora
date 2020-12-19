import React from 'react'
import { Voters } from '../controllers/voteQuestions.js'

export function QuestionDisplay (props) {
    let htmlOutput = []

    props.questions.forEach(entry => {
        let date = new Date(entry.creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}
        
        htmlOutput.push(
            <div className="headline question-headline">
                <Voters id={entry.id} votes={entry.votes} getQ={props.getQ} />
                
                <div className="textBody">
                    <div className="author">{entry.author} asked:</div>
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
