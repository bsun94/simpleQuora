import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HeaderBar from "../views/headerBar.js"
import AskScreen from "./askQuestion.js"
import SeeAnswers from './seeAnswers.js'
import SeeComments from "./seeComments.js"

import ErrorContext from "../errorContext.js"

function Navigator () {
    const [error, setError] = useState(<div />)

    const errors = {error, setError}

    return (
        <div>
            <HeaderBar />
            {error}
            <ErrorContext.Provider value={errors}>
                <Router>
                    <Switch>
                        <Route path="/" exact component={AskScreen} />
                        <Route path="/answersToQuestion/:id" component={SeeAnswers} />
                        <Route path="/commentsToAnswer/:id" component={SeeComments} />
                    </Switch>
                </Router>
            </ErrorContext.Provider>
        </div>
    )
}

export default Navigator
