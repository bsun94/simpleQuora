import React, { useState, useEffect, useContext } from 'react'

import UserContext from '../userContext.js'
import ErrorContext from "../errorContext.js"

import { getHasVoted, postHasVoted } from '../model/hasVoted.js'

import ErrorBox from "../views/errorDisplay.js"

export function Voters (props) {
    const [canVote, setCanVote] = useState()
    const [numVotes, setNumVotes] = useState(0)

    const loginInfo = useContext(UserContext)
    const errorHandle = useContext(ErrorContext)

    async function updateState () {
        let user_has_voted = await getHasVoted({"user_id": loginInfo.userID, [props.content_type]: props.id})
        let net_votes = await getHasVoted({[props.content_type]: props.id})

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
            let response = await postHasVoted({"user": loginInfo.userID, "username": loginInfo.username, [props.content_type]: props.id, "vote_type": "up"})

            if (response.status >= 400) {
                let errors_body = await response.json()
                errorHandle.setError(<ErrorBox msg="posting vote" response={errors_body} />)
            } else {
                setCanVote(false)
                setNumVotes(numVotes + 1)
            }
        }
    }

    async function Downvote (e) {
        if (canVote) {
            let response = await postHasVoted({"user": loginInfo.userID, "username": loginInfo.username, [props.content_type]: props.id, "vote_type": "down"})

            if (response.status >= 400) {
                let errors_body = await response.json()
                errorHandle.setError(<ErrorBox msg="posting vote" response={errors_body} />)
            } else {
                setCanVote(false)
                setNumVotes(numVotes - 1)
            }
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
