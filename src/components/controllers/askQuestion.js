import React, { useState } from 'react'

import logo from "../../KworahLogo.jpg"

import { questions } from "../model/questions.js"

import { QuestionDisplay } from "../views/question.js"

function AskScreen () {
    const [questionPost, setQuestionPost] = useState('')
    const [questionGet, setQuestionGet] = useState([])

    async function getQ () {
        setQuestionGet(await questions("GET", {}))
    }

    async function postQ () {
        questions("POST", {"q_text": questionPost, "q_author": "mstrauss"})
    }

    // async function delQ () {
    //     questions("DELETE", {"q_id": 7})
    // }
    
    // async function patchQ () {
    //     questions("PATCH", {"q_id": 1, "q_votes": 3})
    // }

    return (
        <div>
            <img src={logo} alt="Kworah - Get Your Answers Here!" />
            <input type="text" placeholder="Ask a question!" onChange={e => setQuestionPost(e.target.value)} />
            <button onClick={postQ}>Post a Question!</button>
            <button onClick={getQ}>Get Questions!</button>
            <QuestionDisplay questions={questionGet} />
        </div>
    )
}

export default AskScreen