import React, { useState, useEffect } from 'react'

import UserContext from './userContext.js'

import Navigator from './navigation.js'

function Login () {
    const [userID, setUserID ] = useState(Number())
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn ] = useState(Boolean())

    const value = { 
        userID, username, loggedIn, 
        setUserID, setUsername, setLoggedIn 
    }

    // validation happens within server? - modify back end; modify front end to read validation statuses

    if (loggedIn !== true) {
        return (
            <div>
                <UserContext.Provider value={value}>
                    <input className="loginInput" placeholder="Enter username here" onChange={e => setUsername(e.target.value)} />
                    <input className="loginInput" placeholder="Enter password here" onChange={e => setPassword(e.target.value)} />
                </UserContext.Provider>
            </div>
        )
    } else {
        return (
            <Navigator />
        )
    }

}