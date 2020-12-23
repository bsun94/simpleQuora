import React, { useState, useContext } from 'react'

import { postComments } from "../model/comments.js"

import UserContext from "../userContext"

function Replies (props) {
    const [text, setText] = useState('')
    const [activated, setActivated] = useState("off")

    const { 
        userID, username, loggedIn, 
        setUserID, setUsername, setLoggedIn 
    } = useContext(UserContext)

    async function postC () {
        await postComments({
            "text": text,
            "author": username,
            "answer": props.answer,
            "replyto": props.replyto
        })
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
