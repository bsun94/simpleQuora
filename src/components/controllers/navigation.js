import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import HeaderBar from "../views/headerBar.js"
import AskScreen from "./askQuestion.js"
import SeeAnswers from './seeAnswers.js'
import SeeComments from "./seeComments.js"

function Navigator () {
    return (
        <div>
            <HeaderBar />
            <Router>
                <Switch>
                    <Route path="/" exact component={AskScreen} />
                    <Route path="/answersToQuestion/:id" component={SeeAnswers} />
                    <Route path="/commentsToAnswer/:id" component={SeeComments} />
                </Switch>
            </Router>
        </div>
    )
}

export default Navigator
