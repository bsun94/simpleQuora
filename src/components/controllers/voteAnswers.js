import React, { useState, useEffect, useContext } from 'react'

import UserContext from "../userContext.js"

import { getAnswers, patchAnswers } from '../model/answers.js'
import { getHasVoted, postHasVoted } from '../model/hasVoted.js'

export function Voters (props) {
    const [canVote, setCanVote] = useState(true)

    const { 
        userID, username, loggedIn, 
        setUserID, setUsername, setLoggedIn 
    } = useContext(UserContext)

    async function updateState () {
        let response = await getHasVoted({"user_id": userID, "answer": props.id})
        let body = await response.json()

        if (response.status >= 400) {
            setCanVote(true)
        } else {
            setCanVote(false)
        }
    }

    useEffect(() => updateState(), [])

    async function Upvote (e) {
        if (canVote) {
            let currentVotes = await getAnswers({'id': props.id})
            await patchAnswers({'id': props.id, 'votes': currentVotes[0].votes + 1})
            await postHasVoted({"user": userID, "username": username, "answer": props.id, "vote_type": "up"})
            props.getA(props.q_id)
            updateState()
        }
    }

    async function Downvote (e) {
        if (canVote) {
            let currentVotes = await getAnswers({'id': props.id})
            await patchAnswers({'id': props.id, 'votes': currentVotes[0].votes - 1})
            await postHasVoted({"user": userID, "username": username, "answer": props.id, "vote_type": "down"})
            props.getA(props.q_id)
            updateState()
        }
    }

    return (
        <div className="voteButtons">
            <div className={canVote ? "Upvote" : "Upvote defunct"} onClick={Upvote} ></div>
            <div className="votes">{props.votes}</div>
            <div className={canVote ? "Downvote" : "Downvote defunct"} onClick={Downvote} ></div>
        </div>
    )
}
