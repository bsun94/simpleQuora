import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import UserContext from "../userContext.js"
import db_tables from "../enums/db_enums.js"
import content_types from "../enums/content_type_enums.js"

import { Voters } from '../controllers/voters.js'
import DeleteButton from "../controllers/delete.js"

export function AnswerDisplay (props) {
    const loginInfo = useContext(UserContext)

    let htmlOutput = []

    props.answers.forEach((entry, i) => {
        let date = new Date(entry.creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}

        let delRefresh = () => props.delRefresh(i)
        
        htmlOutput.push(
            <div className="headline answer-headline" id={entry.id} >
                <Voters id={entry.id} votes={entry.votes} content_type={content_types["A"]} getA={props.getA} />
                <Link className="textBody" to={`/commentsToAnswer/${entry.id}`} >
                    <div className="author">{entry.author} answered:</div>
                    <div className="mainText">{entry.text}</div>
                    <div className="date">on {date.toLocaleString('en-US', options)}</div>
                </Link>
                {entry.author === loginInfo.username ? <DeleteButton db={db_tables["A"]} entry_id={entry.id} delRefresh={delRefresh} /> : null}
            
            </div>
        )
    });
    
    return (
        <div>
            {htmlOutput}
        </div>
    )
}
