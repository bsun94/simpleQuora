import React, { useEffect, useState } from 'react'

function ErrorBox (props) {
    const [active, setActive] = useState(false)

    let error_list = []

    Object.entries(props.response).forEach(entry => {
        let [key, value] = entry
        error_list.push(<li>{`${key}: ${value}`}</li>);
    })

    const disappear = (e) => setActive(false)

    useEffect(() => {
        setActive(true)
    }, [props])

    if (active && props) {
        return (
            <div className="errorMsg">
                Error(s) encountered with {props.msg}:
                <ul className="errorList">{error_list}</ul>
                <div className="pageTopSwitch">
                    <button className="subButton" onClick={disappear} >OK</button>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default ErrorBox
