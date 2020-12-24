import React, { useState } from 'react'

import { getUsers, postUsers } from "../model/user.js"
import { sha256 } from "../model/hash.js"

import UserContext from '../userContext.js'

import Navigator from './navigation.js'

function Login () {
    const [userID, setUserID ] = useState(Number())
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setLoginStatus] = useState('')
    const [loggedIn, setLoggedIn ] = useState(false)

    const value = { 
        userID, username, loggedIn, 
        setUserID, setUsername, setLoggedIn 
    }

    async function register() {
        let pw = await sha256(password)
        let response = await postUsers({"username": username, "password": pw})
        let body = await response.json()
        
        if (response.status >= 400) {
            setLoginStatus(
                "'" + Object.keys(body) + "': " + Object.values(body)[0]
                )
        } else {
            setUserID(body[0]["id"])
            setLoginStatus('')
            setLoggedIn(true)
        }
    }
    
    async function login() {
        let pw = await sha256(password)
        let response = await getUsers({"username": username})
        let body = await response.json()
        
        if (response.status >= 400) {
            setLoginStatus(body["Error"])
        } else {
            if (body[0]["password"] !== pw) {
                setLoginStatus('Incorrect password!')
                console.log(pw)
                console.log(body)
            } else {
                setUserID(body[0]["id"])
                setLoginStatus('')
                setLoggedIn(true)
            }
        }
    }

    if (loggedIn !== true) {
        return (
            <div className="loginScreen" >
                <div className="loginTitle">Welcome to Kworah!</div>
                <div className="loginStatus" >{loginStatus}</div>
                <div>
                    <input className="loginInput" placeholder="Enter username here (limit 50 characters)" onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <input className="loginInput" placeholder="Enter password here" type="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <button className="mainButton" onClick={register} >Register User</button>
                <button className="mainButton" onClick={login} >Log In</button>
            </div>
        )
    } else {
        return (
            <UserContext.Provider value={value}>
                <Navigator />
            </UserContext.Provider>
        )
    }

}

export default Login
