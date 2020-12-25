import React, { useEffect, useState, useContext } from 'react'

import UserContext from "../userContext.js"

import { getQuestions, postQuestions } from "../model/questions.js"

import { QuestionDisplay } from "../views/question.js"
import { MainPoster } from "../views/mainPoster.js"
import { MainGetter } from "../views/mainGetter.js"

function AskScreen () {
    const [questionPost, setQuestionPost] = useState('')
    const [questionGet, setQuestionGet] = useState([])

    const [search, setSearch] = useState('')

    const [pageMode, setPageMode] = useState('search')

    const { 
        userID, username, loggedIn, 
        setUserID, setUsername, setLoggedIn 
    } = useContext(UserContext)

    async function getQ () {
        let params = {}
        if (search !== '') {
            params["search"] = search
        }
        
        setQuestionGet(await getQuestions(params))
    }

    async function postQ () {
        await postQuestions({"text": questionPost, "author": username})
        getQ()
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
            <QuestionDisplay questions={questionGet} getQ={getQ} />
        </div>
    )
}

export default AskScreen
