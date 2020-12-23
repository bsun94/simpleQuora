import React, { useContext } from 'react'

import UserContext from "../userContext.js"

function Logout () {
    const { 
        userID, username, loggedIn, 
        setUserID, setUsername, setLoggedIn 
    } = useContext(UserContext)

    const logout = (e) => setLoggedIn(false)

    return (
        <div className="Logout" onClick={logout} >Logout</div>
    )
}

export default Logout
