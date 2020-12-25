import React from 'react'

export function MainGetter (props) {
    return (
        <div className="pageTopSwitch">
            <input className="searchBar" type="text" placeholder="What's on your mind?" onChange={e => props.setFunc(e.target.value)} />
            <button className="subButton" onClick={props.getFunc}>See Questions!</button>
        </div>
    )
}
