import React from 'react'

function UnclickableList (props) {
    let output = []
    props.comments.forEach(comment => {
        let html = (
            <div>
                <span className="text">{comment['text']}</span>
                <span className="votes">{comment['netVote']}</span>
            </div>
        )
        output.push(html)
    })
    return output
}

export default UnclickableList