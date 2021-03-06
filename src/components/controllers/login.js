import React, { useState, useEffect } from 'react'
import cookie from 'react-cookies'

import { getUsers, postUsers } from "../model/user.js"
import { sha256 } from "../model/hash.js"

import UserContext from '../userContext.js'

import Navigator from './navigation.js'

function Login () {
    const [userID, setUserID ] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setLoginStatus] = useState('')
    const [loggedIn, setLoggedIn ] = useState(false)

    const value = { 
        userID, username, loggedIn, 
        setUserID, setUsername, setLoggedIn 
    }

    useEffect(() => {
        if (cookie.load('userID') !== undefined && cookie.load('username') !== undefined) {
            setUserID(cookie.load('userID'))
            setUsername(cookie.load('username'))
            setLoggedIn(true)
        }
    }, [])

    async function register() {
        let pw = await sha256(password)
        let response = await postUsers({"username": username, "password": pw})
        let body = await response.json()
        
        if (response.status >= 400) {
            setLoginStatus(
                "'" + Object.keys(body) + "': " + Object.values(body)[0]
                )
        } else {
            setUserID(body["id"])
            setLoginStatus('')

            cookie.save('userID', body["id"], {path: '/', maxAge: 60 * 60 * 24})
            cookie.save('username', username, {path: '/', maxAge: 60 * 60 * 24})

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
            } else {
                setUserID(body[0]["id"])
                setLoginStatus('')

                cookie.save('userID', body[0]["id"], {path: '/', maxAge: 60 * 60 * 24})
                cookie.save('username', username, {path: '/', maxAge: 60 * 60 * 24})
                
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
