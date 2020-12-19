import React, { useState } from 'react'

import { getAnswers, patchAnswers } from '../model/answers.js'

export function Voters (props) {
    const [active, setActive] = useState(true)  // replace with tracking table in db

    async function Upvote (e) {
        if (active) {
            let currentVotes = await getAnswers({'id': props.id})
            await patchAnswers({'id': props.id, 'votes': currentVotes[0].votes + 1})
            props.getA(props.q_id)
            setActive(false)
        }
    }

    async function Downvote (e) {
        if (active) {
            let currentVotes = await getAnswers({'id': props.id})
            await patchAnswers({'id': props.id, 'votes': currentVotes[0].votes - 1})
            props.getA(props.q_id)
            setActive(false)
        }
    }

    return (
        <div className="voteButtons">
            <div className="Upvote" onClick={Upvote} ></div>
            <div className="votes">{props.votes}</div>
            <div className="Downvote" onClick={Downvote} ></div>
        </div>
    )
}
