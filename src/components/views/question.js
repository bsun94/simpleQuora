import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import UserContext from "../userContext.js"
import db_tables from "../enums/db_enums.js"
import content_types from "../enums/content_type_enums.js"

import { Voters } from '../controllers/voters.js'
import DeleteButton from "../controllers/delete.js"
import EditButton from "../controllers/update.js"

export function QuestionDisplay (props) {
    const loginInfo = useContext(UserContext)
    
    let htmlOutput = []

    props.questions.forEach((entry, i) => {
        let date = new Date(entry.creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}

        let delRefresh = () => props.delRefresh(i)
        let patRefresh = (text) => props.patchRefresh(i, text)

        let additionalButtons = () => {
            if (entry.author === loginInfo.username) {
                return (
                    <div>
                        <EditButton db={db_tables["Q"]} entry_id={entry.id} patchRefresh={patRefresh} />
                        <DeleteButton db={db_tables["Q"]} entry_id={entry.id} delRefresh={delRefresh} />
                    </div>
                )
            }
        }
        
        htmlOutput.push(
            <div className="headline question-headline" id={entry.id} >
                <Voters id={entry.id} votes={entry.votes} content_type={content_types["Q"]} getQ={props.getQ} />
                <Link className="textBody" to={`/answersToQuestion/${entry.id}`} >
                    <div className="author">{entry.author} asked:</div>
                    <div className="mainText">{entry.text}</div>
                    <div className="date">on {date.toLocaleString('en-US', options)}</div>
                </Link>

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
