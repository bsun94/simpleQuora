import React from 'react'

import HeaderBar from "./views/headerBar.js"
import AskScreen from "./controllers/askQuestion.js"

function Navigator () {
    return (
        <div>
            <HeaderBar />
            <AskScreen />
        </div>
    )
}

export default Navigator
