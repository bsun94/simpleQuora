import React from 'react'

export function MainPoster (props) {
    return (
        <div>
            <input type="text" placeholder="Ask a question!" onChange={e => props.setFunc(e.target.value)} />
            <button onClick={props.postFunc}>Post a Question!</button>
        </div>
    )
}
