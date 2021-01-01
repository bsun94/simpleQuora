import React, { useEffect, useState, useContext } from 'react'

import UserContext from "../userContext.js"
import ErrorContext from "../errorContext.js"

import { getQuestions, postQuestions } from "../model/questions.js"

import { QuestionDisplay } from "../views/question.js"
import { MainPoster } from "../views/mainPoster.js"
import { MainGetter } from "../views/mainGetter.js"

import ErrorBox from "../views/errorDisplay.js"

function AskScreen () {
    const [questionPost, setQuestionPost] = useState('')
    const [questionGet, setQuestionGet] = useState([])

    const [search, setSearch] = useState('')

    const [pageMode, setPageMode] = useState('search')

    const loginInfo = useContext(UserContext)
    const errorHandle = useContext(ErrorContext)

    async function getQ () {
        let params = {}
        if (search !== '') {
            params["search"] = search
        }
        
        let response = await getQuestions(params)
        let body = await response.json()

        if (response.status >= 400) {
            errorHandle.setError(<ErrorBox msg="getting questions" response={body} />)
        } else {
            setQuestionGet(body)
        }
    }

    async function postQ () {
        let response = await postQuestions({"text": questionPost, "author": loginInfo.username})
        let body = await response.json()

        if (response.status >= 400) {
            errorHandle.setError(<ErrorBox msg="posting questions" response={body} />)
        } else {
            setQuestionGet([body, ...questionGet])
        }
    }

    function refreshAfterDelete (index) {
        let newArr = [...questionGet]
        newArr.splice(index, 1)
        setQuestionGet(newArr)
    }

    useEffect(() => getQ(), [])

    const mode = {
        'search': <MainGetter setFunc={setSearch} getFunc={getQ} />,
        'ask': <MainPoster setFunc={setQuestionPost} postFunc={postQ} placeholder="Got a question?" buttonText="Ask the Community!" />
    }

    return (
        <div className="contentWrapper">
            <div className="pageTopSwitch">
                <button className="mainButton" onClick={e => setPageMode('ask')}>Ask the Kworah Community!</button>
                <button className="mainButton" onClick={e => setPageMode('search')}>See what's been asked!</button>
            </div>
            {mode[pageMode]}
            <QuestionDisplay questions={questionGet} getQ={getQ} delRefresh={refreshAfterDelete} />
        </div>
    )
}

export default AskScreen
