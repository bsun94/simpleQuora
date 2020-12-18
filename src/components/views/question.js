import React, { useState } from 'react'
import { Voters } from '../controllers/voteQuestions.js'

export function QuestionDisplay (props) {
    let htmlOutput = []

    props.questions.forEach(entry => {
        let date = new Date(entry.q_creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}
        
        htmlOutput.push(
            <div className="headline">
                <span className="mainText">{entry.q_text}</span>
                <span className="author">{entry.q_author}</span>
                <span className="date">{date.toLocaleString('en-US', options)}</span>
                <span className="votes">{entry.q_votes}</span>
                <Voters id={entry.q_id} getQ={props.getQ} />
            </div>
        )
    });
    
    return (
        <div>
            {htmlOutput}
        </div>
    )
}
