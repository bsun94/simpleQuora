import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import UserContext from "../userContext.js"

import { getQuestions } from "../model/questions.js"
import { getAnswers, postAnswers } from "../model/answers.js"

import { QuestionDisplay } from "../views/question.js";
import { AnswerDisplay } from "../views/answer.js"
import { MainPoster } from "../views/mainPoster.js"

function SeeAnswers (props) {
    const [questionGet, setQuestionGet] = useState([])
    const [answerGet, setAnswerGet] = useState([])
    const [answerPost, setAnswerPost] = useState('')

    const loginInfo = useContext(UserContext)

    async function getQ () {
        setQuestionGet(await getQuestions({'id': props.match.params.id}))
    }

    async function getA () {
        setAnswerGet(await getAnswers({'question_id': props.match.params.id}))
    }

    async function postA () {
        let response = await postAnswers({"text": answerPost, "author": loginInfo.username, "question": props.match.params.id})
        setAnswerGet([response, ...answerGet])
    }

    function refreshAfterDelete (index) {
        let newArr = [...answerGet]
        newArr.splice(index, 1)
        setAnswerGet(newArr)
    }

    useEffect(() => {
        getQ()
        getA()
    }, [])  // empty array passed to prevent infinite firing

    return (
        <div>
            <div className="pageTopSwitch">
                <Link to="/" >
                    <button className="mainButton">Back to Questions Page</button>
                </Link>
            </div>
            <MainPoster setFunc={setAnswerPost} postFunc={postA} placeholder="Help the asker out!" buttonText="Answer!" />
            <QuestionDisplay questions={questionGet} getQ={getQ} />
            <AnswerDisplay answers={answerGet} getA={getA} delRefresh={refreshAfterDelete} />
        </div>
    )
}

export default SeeAnswers
