import React, { useState } from 'react'

import logo from "../../KworahLogo.jpg"

import { getQuestions, postQuestions } from "../model/questions.js"

import { QuestionDisplay } from "../views/question.js"
import { MainPoster } from "../views/mainPoster.js"
import { MainGetter } from "../views/mainGetter.js"

function AskScreen () {
    const [questionPost, setQuestionPost] = useState('')
    const [questionGet, setQuestionGet] = useState([])

    const [pageMode, setPageMode] = useState('search')

    async function getQ () {
        setQuestionGet(await getQuestions({}))
    }

    async function postQ () {
        await postQuestions({"q_text": questionPost, "q_author": "bsun"})
    }

    const mode = {
        'search': <MainGetter setFunc={setQuestionGet} getFunc={getQ} />,
        'ask': <MainPoster setFunc={setQuestionPost} postFunc={postQ} />
    }

    return (
        <div>
            <img src={logo} alt="Kworah - Get Your Answers Here!" />
            <button onClick={e => setPageMode('ask')}>Ask the Kworah Community!</button>
            <button onClick={e => setPageMode('search')}>See what's been asked!</button>
            {mode[pageMode]}
            <QuestionDisplay questions={questionGet} getQ={getQ} />
        </div>
    )
}

export default AskScreen
