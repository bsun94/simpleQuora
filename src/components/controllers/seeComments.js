import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import UserContext from '../userContext.js'
import ErrorContext from "../errorContext.js"

import { getAnswers } from "../model/answers.js"
import { getComments, postComments } from "../model/comments.js"

import { AnswerDisplay } from "../views/answer.js";
import { CommentDisplay } from "../views/comment.js"
import { MainPoster } from "../views/mainPoster.js"

import ErrorBox from "../views/errorDisplay.js"

function SeeComments (props) {
    const [answerGet, setAnswerGet] = useState([])
    const [commentGet, setCommentGet] = useState([])
    const [commentPost, setCommentPost] = useState('')
    const [backToQuestion, setBackToQuestion] = useState()

    const loginInfo = useContext(UserContext)
    const errorHandle = useContext(ErrorContext)

    async function backToAnswers () {
        let response = await getAnswers({'id': props.match.params.id})
        let body = await response.json()

        if (response.status >= 400) {
            errorHandle.setError(<ErrorBox msg="getting answer for 'back to' button" response={body} />)
        } else {
            setBackToQuestion(body[0].question)
        }
    }

    async function getA () {
        let response = await getAnswers({'id': props.match.params.id})
        let body = await response.json()

        if (response.status >= 400) {
            errorHandle.setError(<ErrorBox msg="getting answers" response={body} />)
        } else {
            setAnswerGet(body)
        }
    }

    async function getC () {
        let response = await getComments({'answer_id': props.match.params.id})
        let body = await response.json()

        if (response.status >= 400) {
            errorHandle.setError(<ErrorBox msg="getting comments" response={body} />)
        } else {
            setCommentGet(body)
        }
    }

    function refreshAfterPost (response, body) {
        if (response.status >= 400) {
            errorHandle.setError(<ErrorBox msg="posting comments" response={body} />)
        } else {
            setCommentGet([...commentGet, body])
        }
    }

    async function postC () {
        let response = await postComments({"text": commentPost, "author": loginInfo.username, "answer": props.match.params.id})
        let body = await response.json()

        refreshAfterPost(response, body)
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
            <CommentDisplay comments={commentGet} getC={getC} delRefresh={refreshAfterDelete} postRefresh={refreshAfterPost} />
        </div>
    )
}

export default SeeComments
