import React, { useState, useEffect, useContext } from 'react'

import ModeContext from "../pageContext.js"

import { getQuestions } from "../model/questions.js"
import { getAnswers, postAnswers } from "../model/answers.js"

import { QuestionDisplay } from "../views/question.js";
import { AnswerDisplay } from "../views/answer.js"
import { MainPoster } from "../views/mainPoster.js"

function SeeAnswers (props) {
    const [questionGet, setQuestionGet] = useState([])
    const [answerGet, setAnswerGet] = useState([])
    const [answerPost, setAnswerPost] = useState('')

    const { mode, setMode } = useContext(ModeContext)

    const backToQuestions = () => setMode(['question', null])

    async function getQ () {
        setQuestionGet(await getQuestions({'id': props.question_id}))
    }

    async function getA () {
        setAnswerGet(await getAnswers({'question_id': props.question_id}))
    }

    async function postA () {
        await postAnswers({"text": answerPost, "author": "rjerling", "question": props.question_id})
        getA()
    }

    useEffect(() => {
        getQ()
        getA()
    }, [])  // empty array passed to prevent infinite firing

    return (
        <div>
            <div className="pageTopSwitch">
                <button className="mainButton" onClick={backToQuestions}>Back to Questions Page</button>
            </div>
            <MainPoster setFunc={setAnswerPost} postFunc={postA} placeholder="Help the asker out!" buttonText="Answer!" />
            <QuestionDisplay questions={questionGet} getQ={getQ} />
            <AnswerDisplay answers={answerGet} getA={getA} />
        </div>
    )
}

export default SeeAnswers
