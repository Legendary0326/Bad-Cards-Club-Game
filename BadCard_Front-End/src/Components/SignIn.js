import React, {useRef, useEffect, useState} from 'react';
import "./SignIn.css";
import Logo from "../assets/logo.png";
import { useEthers } from "@usedapp/core";

const SignIn = () => {
    const unmounted = useRef(true);
    const { activateBrowserWallet, deactivate, account, chainId } = useEthers();
    const [connectClicked, setConnectClicked] = useState(false);

    console.log('activateBrowserWallet:::', account)
    function handleConnectWallet(){
        activateBrowserWallet();
        setConnectClicked(true);
    }

    useEffect( () => {
        console.log('chainId', chainId);
        if(account && connectClicked && (chainId == 56 || chainId == 1)){
                window.location = "/home";
        }
        return () => { unmounted.current = false }
    }, [account, connectClicked]);

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
