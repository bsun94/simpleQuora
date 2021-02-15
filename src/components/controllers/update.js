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

        expandEditor()
    }

    function expandEditor () {
        if (activated === "off") {
            setActivated("on")
        } else {
            setActivated("off")
        }
    }

    const mode = {
        "on":
        <div className="repliesNotebox"> 
            <div className="mainText">What would you like to change it to?</div>
            <input type="text" className="repliesInput" placeholder="Input new text here!" onChange={e => setText(e.target.value)} />
            <br />
            <button className="repliesPoster" onClick={editElement} >Edit!</button>
            <br />
            <button className="repliesPoster" onClick={expandEditor} >Cancel</button>
        </div>,
        "off": <div /> 
    }

    return (
        <div>
            <button className="patcher" onClick={expandEditor} >Edit</button>
                {mode[activated]}
        </div>
    )
}

export default EditButton