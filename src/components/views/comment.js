import React from 'react'

export function CommentDisplay (props) {
    let htmlOutput = []

    props.comments.forEach(entry => {
        let date = new Date(entry.creation_time)
        let options = {dateStyle: 'long', timeStyle: 'short'}
        
        htmlOutput.push(
            <div className="headline comment-headline" id={entry.id}>                
                <div className="textBody">
                    <div className="author">{entry.author} commented:</div>
                    <div className="mainText">{entry.text}</div>
                    <div className="date">on {date.toLocaleString('en-US', options)}</div>
                </div>
            
            </div>
        )
    });
    
    return (
        <div>
            {htmlOutput}
        </div>
    )
}
