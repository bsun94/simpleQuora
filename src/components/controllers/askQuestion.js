import React, { useState } from 'react'

function AskScreen () {
    const [question, setQuestion] = useState('')

    async function getState () {
        await fetch('http://127.0.0.1:8000/quoraBase/questions', {method: 'GET'})
            .then(response => response.json())
            .then(json => setQuestion(json))
            .then(console.log(question))
    }

    return (
        <div>
            <input type="text" placeholder="Ask a question!" onChange={e => setQuestion(e.target.value)} />
            <button onClick={getState}>Post!</button>
        </div>
    )
}

export default AskScreen