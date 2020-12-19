import React from 'react'

const modeContext = React.createContext({
    mode: 'question',
    setMode: () => {}
})

export default modeContext
