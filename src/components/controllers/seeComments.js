import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import UserContext from '../userContext.js'

import { getAnswers } from "../model/answers.js"
import { getComments, postComments } from "../model/comments.js"

import { AnswerDisplay } from "../views/answer.js";
import { CommentDisplay } from "../views/comment.js"
import { MainPoster } from "../views/mainPoster.js"

function SeeComments (props) {
    const [answerGet, setAnswerGet] = useState([])
    const [commentGet, setCommentGet] = useState([])
    const [commentPost, setCommentPost] = useState('')
    const [backToQuestion, setBackToQuestion] = useState()

    const loginInfo = useContext(UserContext)

    async function backToAnswers () {
        let question_id = await getAnswers({'id': props.match.params.id})
        setBackToQuestion(question_id[0].question)
    }

    async function getA () {
        setAnswerGet(await getAnswers({'id': props.match.params.id}))
    }

    async function getC () {
        setCommentGet(await getComments({'answer_id': props.match.params.id}))
    }

    async function postC () {
        let response = await postComments({"text": commentPost, "author": loginInfo.username, "answer": props.match.params.id})
        setCommentGet([response, ...commentGet])
    }

    function refreshAfterDelete (index) {
        let newArr = [...commentGet]
        newArr.splice(index, 1)
        setCommentGet(newArr)
    }

    useEffect(() => {
        getA()
        getC()
        backToAnswers()
    }, [])  // empty array passed to prevent infinite firing

    return (
        <div>
            <div className="pageTopSwitch">
                <Link to={`/answersToQuestion/${backToQuestion}`} >
                    <button className="mainButton">Back to Answers Page</button>
                </Link>
            </div>
            <MainPoster setFunc={setCommentPost} postFunc={postC} placeholder="Comment..." buttonText="Post Comment" />
            <AnswerDisplay answers={answerGet} getA={getA} />
            <CommentDisplay comments={commentGet} getC={getC} delRefresh={refreshAfterDelete} />
        </div>
    )
}

export default SeeComments
