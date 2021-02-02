import React, { useState, useContext } from 'react'

import db_tables from "../enums/db_enums.js"

import ErrorContext from "../errorContext.js"

import { patchQuestions } from "../model/questions.js"
import { patchAnswers } from "../model/answers.js"
import { patchComments } from "../model/comments.js"

import ErrorBox from "../views/errorDisplay.js"

function EditButton (props) {
    const [text, setText] = useState('')
    const [activated, setActivated] = useState("off")

    const errorHandle = useContext(ErrorContext)
    
    const editFuncs = {
        [db_tables["Q"]]: patchQuestions,
        [db_tables["A"]]: patchAnswers,
        [db_tables["C"]]: patchComments
    }

    async function editElement () {
        let response = await editFuncs[props.db]({"id": props.entry_id, "text": text})

        if (response.status >= 400){
            let body = await response.json()
            errorHandle.setError(<ErrorBox msg="edit" response={body} />)
        } else {
            props.patchRefresh(text)
        }
    }

    function expandEditor () {
        if (activated === "off") {
            setActivated("on")
        } else {
            setActivated("off")
        }
    }

    const mode = {
        "on": <span>
            <input type="text" className="repliesInput" placeholder="Input new text here!" onChange={e => setText(e.target.value)} />
            <button className="repliesPoster" onClick={editElement} >Edit!</button>
        </span>,
        "off": <div /> 
    }

    return (
        <div>
            <button className="editor" onClick={expandEditor} >Edit</button>
            {mode[activated]}
        </div>
    )
}

export default EditButton