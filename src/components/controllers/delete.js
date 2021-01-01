import React, { useContext } from 'react'

import db_tables from "../enums/db_enums.js"

import ErrorContext from "../errorContext.js"

import { deleteQuestions } from "../model/questions.js"
import { deleteAnswers } from "../model/answers.js"
import { deleteComments } from "../model/comments.js"

import ErrorBox from "../views/errorDisplay.js"

function DeleteButton (props) {
    const errorHandle = useContext(ErrorContext)
    
    const deleteFuncs = {
        [db_tables["Q"]]: deleteQuestions,
        [db_tables["A"]]: deleteAnswers,
        [db_tables["C"]]: deleteComments
    }

    async function delElement () {
        let response = await deleteFuncs[props.db]({"id": props.entry_id})

        if (response.status >= 400){
            let body = await response.json()
            errorHandle.setError(<ErrorBox msg="deletion" response={body} />)
        } else {
            props.delRefresh()
        }
    }

    return (
        <button className="deletor" onClick={delElement} >Delete</button>
    )
}

export default DeleteButton
