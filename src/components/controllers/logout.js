import React, { useContext } from 'react'

import UserContext from "../userContext.js"

function Logout () {
    const loginInfo = useContext(UserContext)

    const logout = (e) => {
        loginInfo.setLoggedIn(false)
        loginInfo.setUserID(null)
        loginInfo.setUsername('')
    }

    return (
        <div className="Logout" onClick={logout} >Logout</div>
    )
}

export default Logout
