import React, { useContext } from 'react'

import UserContext from "../userContext.js"

function Logout () {
    const loginInfo = useContext(UserContext)

    const logout = (e) => loginInfo.setLoggedIn(false)

    return (
        <div className="Logout" onClick={logout} >Logout</div>
    )
}

export default Logout
