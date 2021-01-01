import React, { useState, useEffect, useContext } from 'react'

import UserContext from "../userContext.js"

import { getHasVoted, postHasVoted } from '../model/hasVoted.js'

export function Voters (props) {
    const [canVote, setCanVote] = useState()
    const [numVotes, setNumVotes] = useState(0)

    const loginInfo = useContext(UserContext)

    async function updateState () {
        let user_has_voted = await getHasVoted({"user_id": loginInfo.userID, "answer": props.id})
        let net_votes = await getHasVoted({"answer": props.id})

        let response_user_voted = await user_has_voted.json()

        if (user_has_voted.status < 300) {
            setCanVote(!response_user_voted["has_voted"])
        }

        let response_votes = await net_votes.json()

        if (net_votes.status < 300) {
            setNumVotes(response_votes["votes"])
        }
    }

    useEffect(() => updateState(), [])

    async function Upvote (e) {
        if (canVote) {
            postHasVoted({"user": loginInfo.userID, "username": loginInfo.username, "answer": props.id, "vote_type": "up"})
            setCanVote(false)
            setNumVotes(numVotes + 1)
        }
    }

    async function Downvote (e) {
        if (canVote) {
            postHasVoted({"user": loginInfo.userID, "username": loginInfo.username, "answer": props.id, "vote_type": "down"})
            setCanVote(false)
            setNumVotes(numVotes - 1)
        }
    }

    return (
        <div className="voteButtons">
            <div className={canVote ? "Upvote" : "Upvote defunct"} onClick={Upvote} ></div>
            <div className="votes">{numVotes}</div>
            <div className={canVote ? "Downvote" : "Downvote defunct"} onClick={Downvote} ></div>
        </div>
    )
}
