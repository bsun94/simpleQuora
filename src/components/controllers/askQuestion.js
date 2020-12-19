import React, { useState } from 'react'

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
        'search': <MainGetter setFunc={() => {return}} getFunc={getQ} />,
        'ask': <MainPoster setFunc={setQuestionPost} postFunc={postQ} />
    }

    return (
        <div className="contentWrapper">
            <div className="pageTopSwitch">
                <button className="mainButton" onClick={e => setPageMode('ask')}>Ask the Kworah Community!</button>
                <button className="mainButton" onClick={e => setPageMode('search')}>See what's been asked!</button>
            </div>
            {mode[pageMode]}
            <QuestionDisplay questions={questionGet} getQ={getQ} />
        </div>
    )
}

export default AskScreen
