import React, { useState, useContext } from 'react'

import { postComments } from "../model/comments.js"

import UserContext from "../userContext.js"

function Replies (props) {
    const [text, setText] = useState('')
    const [activated, setActivated] = useState("off")

    const loginInfo = useContext(UserContext)

    async function postC () {
        let response = await postComments({
            "text": text,
            "author": loginInfo.username,
            "answer": props.answer,
            "replyto": props.replyto
        })

        let body = await response.json()
        body["originalauthor"] = props.originalAuthor
        body["originaltext"] = props.originalText

        props.postRefresh(response, body)
    }

    function expandPoster () {
        if (activated === "off") {
            setActivated("on")
        } else {
            setActivated("off")
        }
    }

    const mode = {
        "on": <span>
            <input type="text" className="repliesInput" placeholder={"@" + props.originalAuthor} onChange={e => setText(e.target.value)} />
            <button className="repliesPoster" onClick={postC} >Post!</button>
        </span>,
        "off": <div /> 
    }
    return (
        <div>
            <button className="repliesExpand" onClick={expandPoster} >Reply to {props.originalAuthor}</button>
            {mode[activated]}
        </div>
    )
}

export default Replies
