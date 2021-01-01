import React from 'react'

const ErrorContext = React.createContext({
    error: <div />,
    setError: () => {}
})

export default ErrorContext