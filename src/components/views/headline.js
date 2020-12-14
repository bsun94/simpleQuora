import React from 'react'

function Headline (props) {
    return (
        <div className="headline">
            <span className="mainText">{props.text}</span>
            <span className="votes">{props.netVote}</span>
        </div>
    )
}

export default Headline