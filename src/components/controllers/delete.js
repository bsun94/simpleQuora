import React from 'react'

function DeleteButton (props) {
    return (
        <button className="deletor" onClick={props.delFunc} >Delete</button>
    )
}

export default DeleteButton
