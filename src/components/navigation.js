import React, { useState } from 'react'

import ModeContext from "./pageContext.js"

import HeaderBar from "./views/headerBar.js"
import AskScreen from "./controllers/askQuestion.js"
import SeeAnswers from './controllers/seeAnswers.js'

function Navigator () {
    const [mode, setMode] = useState(['question', null])
    const value = { mode, setMode }

    const views = {
        'question': <AskScreen />,
        'answer': <SeeAnswers question_id={mode[1]} />,
        'comment': <div></div>
    }

    return (
        <div>
            <HeaderBar />
            <ModeContext.Provider value={value}>
                {views[mode[0]]}
            </ModeContext.Provider>
        </div>
    )
}

export default Navigator
