import React from 'react'

const UserContext = React.createContext({
    userID: '',
    username: '',
    loggedIn: Boolean(),
    setUserID: () => {},
    setUsername: () => {},
    setLoggedIn: () => {}
})

export default UserContext
