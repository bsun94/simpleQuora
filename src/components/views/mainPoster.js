import React from 'react'

export function MainPoster (props) {
    return (
        <div className="pageTopSwitch">
            <input className="searchBar" type="text" placeholder={props.placeholder} onChange={e => props.setFunc(e.target.value)} />
            <button className="subButton" onClick={props.postFunc}>{props.buttonText}</button>
        </div>
    )
}
