import React, { useState } from 'react'

import ModeContext from "./pageContext.js"

import HeaderBar from "./views/headerBar.js"
import AskScreen from "./controllers/askQuestion.js"
import SeeAnswers from './controllers/seeAnswers.js'
import SeeComments from "./controllers/seeComments.js"

function Navigator () {
    const [mode, setMode] = useState(['question', null])
    const value = { mode, setMode }

    // React router - routing from child
    const views = {
        'question': <AskScreen />,
        'answer': <SeeAnswers question_id={mode[1]} />,
        'comment': <SeeComments answer_id={mode[1]} />
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
