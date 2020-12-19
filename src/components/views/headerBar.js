import React from 'react'

import logo from "../../KworahLogo.jpg"
import slogan from "../../KworahSlogan.jpg"

function HeaderBar () {
    return (
        <div className="headerBar">
            <img id="logo" src={logo} alt="Kworah - Get Your Answers Here!" />
            {/* <img id="slogan" src={slogan} alt="Kworah - Be Curious!" /> */}
        </div>
    )
}

export default HeaderBar
