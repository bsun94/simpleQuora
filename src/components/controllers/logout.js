import React, { useContext } from 'react'
import cookie from 'react-cookies'

import UserContext from "../userContext.js"

function Logout () {
    const loginInfo = useContext(UserContext)

    const logout = (e) => {
        cookie.remove('userID', {path: '/', maxAge: 60 * 60 * 24})
        cookie.remove('username', {path: '/', maxAge: 60 * 60 * 24})
        
        loginInfo.setLoggedIn(false)
        loginInfo.setUserID(null)
        loginInfo.setUsername('')
    }

    return (
        <div className="Logout" onClick={logout} >Logout</div>
    )
}

export default Logout
