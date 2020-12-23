import React, { useContext } from 'react'

import ModeContext from "../pageContext.js"
import UserContext from "../userContext.js"

import { Voters } from '../controllers/voteQuestions.js'
import DeleteButton from "../controllers/delete.js"
import { deleteQuestions } from "../model/questions.js"

export function QuestionDisplay (props) {
    const { mode, setMode } = useContext(ModeContext)
    const { 
        userID, username, loggedIn, 
        setUserID, setUsername, setLoggedIn 
    } = useContext(UserContext)
    
    let htmlOutput = []

    props.questions.forEach(entry => {
        let date = new Date(entry.creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}

        let viewQuestion = () => setMode(['answer', entry.id])

        async function delQ () {
            await deleteQuestions({"id": entry.id})
        }
        
        htmlOutput.push(
            <div className="headline question-headline" id={entry.id} >
                <Voters id={entry.id} votes={entry.votes} getQ={props.getQ} />
                
                <div className="textBody" onClick={viewQuestion} >
                    <div className="author">{entry.author} asked:</div>
                    <div className="mainText">{entry.text}</div>
                    <div className="date">on {date.toLocaleString('en-US', options)}</div>
                </div>
                {entry.author === username ? <DeleteButton delFunc={delQ} /> : null}
            
            </div>
        )
    });
    
    return (
        <div>
            {htmlOutput}
        </div>
    )
}
