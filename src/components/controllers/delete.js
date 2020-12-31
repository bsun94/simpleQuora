import React from 'react'

import { deleteQuestions } from "../model/questions.js"
import { deleteAnswers } from "../model/answers.js"
import { deleteComments } from "../model/comments.js"

function DeleteButton (props) {
    
    const deleteFuncs = {
        "Questions": deleteQuestions,
        "Answers": deleteAnswers,
        "Comments": deleteComments
    }

    function delElement () {
        deleteFuncs[props.db]({"id": props.entry_id})
        props.delRefresh()
    }

    return (
        <button className="deletor" onClick={delElement} >Delete</button>
    )
}

export default DeleteButton
