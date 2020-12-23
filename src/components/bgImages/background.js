import React, { useState, useEffect } from 'react'

import bg1 from "./bg1.jpg"
import bg2 from "./bg2.jpg"
import bg3 from "./bg3.jpg"
import bg4 from "./bg4.jpg"
import bg5 from "./bg5.jpg"

function BgImgs () {
    const numPics = 5
    const [currImg, setCurrImg] = useState()

    useEffect(() => {
        changeBg()
        setCurrImg(numPics)
    }, [])
    
    function changeBg () {
        let index = numPics
        setInterval(
            () => {
                index < numPics ? index++ : index = 1
                setCurrImg(index)
            }
            , 60000
        )
    }

    return (
        <div className="background">
            <div className={currImg === 1 ? "bgImage active" : "bgImage"} style={{backgroundImage: `url(${bg1})`}} />
            <div className={currImg === 2 ? "bgImage active" : "bgImage"} style={{backgroundImage: `url(${bg2})`}} />
            <div className={currImg === 3 ? "bgImage active" : "bgImage"} style={{backgroundImage: `url(${bg3})`}} />
            <div className={currImg === 4 ? "bgImage active" : "bgImage"} style={{backgroundImage: `url(${bg4})`}} />
            <div className={currImg === 5 ? "bgImage active" : "bgImage"} style={{backgroundImage: `url(${bg5})`}} />
        </div>
    )
}

export default BgImgs
