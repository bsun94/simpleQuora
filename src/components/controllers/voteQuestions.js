import React, { useState } from 'react'

import { getQuestions, patchQuestions } from '../model/questions.js'

export function Voters (props) {
    const [active, setActive] = useState(true)

    async function Upvote (e) {
        if (active) {
            let currentVotes = await getQuestions({'q_id': props.id})
            await patchQuestions({'q_id': props.id, 'q_votes': currentVotes[0].q_votes + 1})
            props.getQ()
            setActive(false)
        }
    }

    async function Downvote (e) {
        if (active) {
            let currentVotes = await getQuestions({'q_id': props.id})
            await patchQuestions({'q_id': props.id, 'q_votes': currentVotes[0].q_votes - 1})
            props.getQ()
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
