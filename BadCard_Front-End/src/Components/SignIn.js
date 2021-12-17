import React from 'react';
import "./SignIn.css";
import Logo from "../assets/logo.png";
import { useEthers } from "@usedapp/core";

const SignIn = () => {
    const { activateBrowserWallet, deactivate, account, chainId } = useEthers();

    function handleConnectWallet(){
        activateBrowserWallet();
        // window.location = "/home";
    // console.log(activateBrowserWallet)

    }

    return (
        <div className="SignIn">
            <div className="SignIn-logo-area">
                <div className="SignIn-logo">
                    <img src={Logo} alt="logo" />
                </div>
                <div className="SignIn-logo-btn">
                    <button onClick={ handleConnectWallet }><h3>Connect Wallet</h3></button>
                </div>
            </div>
        </div>
    )
}

export default SignIn
