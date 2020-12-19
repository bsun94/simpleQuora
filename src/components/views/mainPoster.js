import React from 'react'

export function MainPoster (props) {
    return (
        <div className="pageTopSwitch">
            <input className="searchBar" type="text" placeholder="Ask a question!" onChange={e => props.setFunc(e.target.value)} />
            <button className="subButton" onClick={props.postFunc}>Post a Question!</button>
        </div>
    )
}
