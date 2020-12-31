import React, { useContext } from 'react'

import UserContext from "../userContext.js"
import db_tables from "../controllers/db_enums.js"

import Replies from "./replies.js"
import DeleteButton from "../controllers/delete.js"

export function CommentDisplay (props) {
    const loginInfo = useContext(UserContext)
    
    let htmlOutput = []

    props.comments.forEach((entry, i) => {
        let date = new Date(entry.creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}

        let delRefresh = () => props.delRefresh(i)
        
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
                {entry.author === loginInfo.username ? <DeleteButton db={db_tables["C"]} entry_id={entry.id} delRefresh={delRefresh} /> : null}

            </div>
        )
    });
    
    return (
        <div>
            {htmlOutput}
        </div>
    )
}
