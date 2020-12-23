import React, { useContext } from 'react'

import ModeContext from "../pageContext.js"
import UserContext from "../userContext.js"

import { Voters } from '../controllers/voteAnswers.js'
import DeleteButton from "../controllers/delete.js"
import { deleteAnswers } from "../model/answers.js"

export function AnswerDisplay (props) {
    const { mode, setMode } = useContext(ModeContext)
    const { 
        userID, username, loggedIn, 
        setUserID, setUsername, setLoggedIn 
    } = useContext(UserContext)

    let htmlOutput = []

    props.answers.forEach(entry => {
        let date = new Date(entry.creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}

        const viewAnswer = () => setMode(['comment', entry.id])

        async function delA () {
            await deleteAnswers({"id": entry.id})
        }
        
        htmlOutput.push(
            <div className="headline answer-headline" id={entry.id} >
                <Voters id={entry.id} q_id={entry.question} votes={entry.votes} getA={props.getA} />
                
                <div className="textBody" onClick={viewAnswer} >
                    <div className="author">{entry.author} answered:</div>
                    <div className="mainText">{entry.text}</div>
                    <div className="date">on {date.toLocaleString('en-US', options)}</div>
                </div>
                {entry.author === username ? <DeleteButton delFunc={delA} /> : null}
            
            </div>
        )
    });
    
    return (
        <div>
            {htmlOutput}
        </div>
    )
}
