import React, { useState } from 'react'

import logo from "../../KworahLogo.jpg"

import { questions } from "../model/questions.js"

function AskScreen () {
    const [questionPost, setQuestionPost] = useState('')
    const [questionGet, setQuestionGet] = useState([])

    async function getQ () {
        questions("GET", {"q_creation_time": 1})
            .then(resp => setQuestionGet(resp))
            .then(console.log(questionGet))
    }

    async function postQ () {
        questions("POST", {"q_text": "When is Christmas?", "q_author": "ppatel"})
    }

    return (
        <div>
            <img src={logo} alt="Kworah - Get Your Answers Here!" />
            <input type="text" placeholder="Ask a question!" onChange={e => setQuestionPost(e.target.value)} />
            <button onClick={postQ}>Post a Question!</button>
            <button onClick={getQ}>Get Questions!</button>
        </div>
    )
}

export default AskScreen