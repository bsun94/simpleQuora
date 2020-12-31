import React, { useEffect, useState } from 'react'

function ErrorBox (props) {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(true)
    }, [props])

    const disappear = (e) => setActive(false)

    if (active && props) {
        return (
            <div className="errorMsg">
                {Object.values(props.error)}
                <button className="subButton" onClick={disappear} >OK</button>
            </div>
        )
    }
}

export default ErrorBox
