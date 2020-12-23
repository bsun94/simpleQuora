import React, { useContext } from 'react'

import UserContext from "../userContext.js"

import Replies from "./replies.js"
import DeleteButton from "../controllers/delete.js"
import { deleteComments } from "../model/comments.js"

export function CommentDisplay (props) {
    const { 
        userID, username, loggedIn, 
        setUserID, setUsername, setLoggedIn 
    } = useContext(UserContext)
    
    let htmlOutput = []

    props.comments.forEach(entry => {
        let date = new Date(entry.creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}

        async function delC () {
            await deleteComments({"id": entry.id})
        }
        
        htmlOutput.push(
            <div className="headline comment-headline" id={entry.id}>                
                <div className="textBody">
                    <div className="author">{
                        entry.originalauthor 
                        ? entry.author + " replied to " + entry.originalauthor + ":"
                        : entry.author + " commented:"}
                    </div>
                    {entry.originaltext
                    ? <div className="replyText">
                        {`--  ${entry.originaltext}`}
                    </div>
                    : null
                    }
                    <div className="mainText">{entry.text}</div>
                    <div className="date">on {date.toLocaleString('en-US', options)}</div>
                    <Replies answer={entry.answer_id} replyto={entry.id} originalAuthor={entry.author} />
                </div>
                {entry.author === username ? <DeleteButton delFunc={delC} /> : null}

            </div>
        )
    });
    
    return (
        <div>
            {htmlOutput}
        </div>
    )
}
