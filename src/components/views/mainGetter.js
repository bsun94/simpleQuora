import React from 'react'

export function MainGetter (props) {
    return (
        <div>
            <input type="text" placeholder="What's on your mind?" onChange={e => props.setFunc(e.target.value)} />
            <button onClick={props.getFunc}>Search Kworah!</button>
        </div>
    )
}
