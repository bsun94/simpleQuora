import React, { useContext } from 'react'

import UserContext from "../userContext.js"
import db_tables from "../enums/db_enums.js"

import Replies from "../controllers/replies.js"
import DeleteButton from "../controllers/delete.js"
import EditButton from "../controllers/update.js"

export function CommentDisplay (props) {
    const loginInfo = useContext(UserContext)
    
    let htmlOutput = []

    props.comments.forEach((entry, i) => {
        let date = new Date(entry.creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}

        let delRefresh = () => props.delRefresh(i)
        let patRefresh = (text) => props.patchRefresh(i, text)

        let additionalButtons = () => {
            if (entry.author === loginInfo.username) {
                return (
                    <div>
                        <EditButton db={db_tables["C"]} entry_id={entry.id} patchRefresh={patRefresh} />
                        <DeleteButton db={db_tables["C"]} entry_id={entry.id} delRefresh={delRefresh} />
                    </div>
                )
            }
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
                    <Replies answer={entry.answer_id} replyto={entry.id} originalAuthor={entry.author} originalText={entry.text} postRefresh={props.postRefresh} />
                </div>

                {additionalButtons()}

            </div>
        )
    });
    
    return (
        <div>
            {htmlOutput}
        </div>
    )
}
