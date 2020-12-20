import React, { useState, useEffect, useContext } from 'react'

import ModeContext from "../pageContext.js"

import { getAnswers } from "../model/answers.js"
import { getComments, postComments } from "../model/comments.js"

import { AnswerDisplay } from "../views/answer.js";
import { CommentDisplay } from "../views/comment.js"
import { MainPoster } from "../views/mainPoster.js"

function SeeComments (props) {
    const [answerGet, setAnswerGet] = useState([])
    const [commentGet, setCommentGet] = useState([])
    const [commentPost, setCommentPost] = useState('')

    const { mode, setMode } = useContext(ModeContext)

    async function backToAnswers () {
        let question_id = await getAnswers({'id': props.answer_id})
        setMode(['answer', question_id[0].question])
    }

    async function getA () {
        setAnswerGet(await getAnswers({'id': props.answer_id}))
    }

    async function getC () {
        setCommentGet(await getComments({'answer_id': props.answer_id}))
    }

    async function postC () {
        await postComments({"text": commentPost, "author": "bsun", "answer": props.answer_id})
        getC()
    }

    useEffect(() => {
        getA()
        getC()
    }, [])  // empty array passed to prevent infinite firing

    return (
        <div>
            <div className="pageTopSwitch">
                <button className="mainButton" onClick={backToAnswers}>Back to Answers Page</button>
            </div>
            <MainPoster setFunc={setCommentPost} postFunc={postC} placeholder="Comment..." buttonText="Post Comment" />
            <AnswerDisplay answers={answerGet} getA={getA} />
            <CommentDisplay comments={commentGet} getC={getC} />
        </div>
    )
}

export default SeeComments
