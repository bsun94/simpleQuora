import React from 'react'

function ClickableList (props) {
    let output = []
    props.answers.forEach(answer => {
        let html = (
            <div>
                <span className="text">{answer['text']}</span>
                <span className="votes">{answer['netVote']}</span>
                <span className="numchild">{answer['numChildren']}</span>
            </div>
        )
        output.push(html)
    })
    return output
}

export default ClickableList