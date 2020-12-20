import React, { useContext } from 'react'

import ModeContext from "../pageContext.js"

import { Voters } from '../controllers/voteAnswers.js'

export function AnswerDisplay (props) {
    const { mode, setMode } = useContext(ModeContext)

    let htmlOutput = []

    props.answers.forEach(entry => {
        let date = new Date(entry.creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}

        const viewAnswer = () => setMode(['comment', entry.id])
        
        htmlOutput.push(
            <div className="headline answer-headline" id={entry.id} onClick={viewAnswer} >
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
