import React, { useState, useEffect } from 'react';
import Footer from 'components/Footer';
import { Link, Redirect } from 'react-router-dom';
import Images from 'shared/images';
import { useEthers, useEtherBalance } from '@usedapp/core';
import { formatEther } from "@ethersproject/units";
import './styles.scss';
import axios from "axios";

const SignIn = () => {
  const BaseUrl = "http://localhost:5000/";
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [password, setPassword] = useState('');
  const [useremail, setEmail] = useState('');
  const [val_inite, setinite] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [errors, seteer] = useState(
    {
      email: '',
      password: '',
      metamask: ''
    });

  useEffect(() => {
    if (val_inite == true) {
      validate()
    }
  }, [password, useremail, account]);

  const handleMetamask = () => {
    activateBrowserWallet();
  }

  function handleSubmit(e) {
    if (validate()) {
      AfterHandle()
    }
    setinite(true);
  }

  function AfterHandle() {
    axios.post(`${BaseUrl}api/users/login`, {
      email: useremail,
      password: password,
      address: account
    })
      .then(res => {
        const { suc, msg } = res.data;
        let errMsg = {
          email: '',
          password: '',
          address: ''
        }
        if (suc === "suc") {
          const { token } = res.data;
          localStorage.setItem("jwtToken", token);
          setinite(false);
          setRedirect(true);
        } else if (suc === "email") {
          errMsg.email = msg
        } else if (suc === "password") {
          errMsg.password = msg;
        } else {
          errMsg.address = msg;
        }
        seteer(errMsg);
      })
  }

  function validate() {
    let isValid = true;
    let errMsg = {
      email: '',
      password: '',
      address: ''
    }
    if (!account) {
      isValid = false;
      errMsg.metamask = "Please connect your Metamask."
    }

    if (!useremail) {
      isValid = false;
      errMsg.email = "Please enter your email Address.";
    }

    if (typeof useremail !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(useremail)) {
        isValid = false;
        errMsg.email = "Please enter valid email address.";
      }
    }

    if (!password) {
      isValid = false;
      errMsg.password = "Please enter your password.";
    }

    if (typeof password !== "undefined") {
      if (password.length < 6) {
        isValid = false;
        errMsg.password = "Please add at least 6 charachter.";
      }
    }
    seteer(errMsg);
    return isValid;
  }
  if (redirect) {
    return <Redirect to="/" />
  }
  else {
    return (
      <>
        <header className='container'>
          <div className='row'>
            <div className='col text-center'>
              <img
                style={{ width: '100px', margin: '1rem auto' }}
                src={Images.menu_logo}
                alt='logo'
              />
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            <div className='text-center'>
              <h2 className='text-black-50 mx-auto mb-5'>Sign In</h2>
            </div>
          </div>
        </header>
        <section className='about-section text-center' id='about'>
          <div className='container px-4 px-lg-5'>
            <div className='row gx-4 gx-lg-5 justify-content-center'>
              <div className='col-lg-5'>
                <div className='connect-box'>
                  <div className='text-center mb-3'> Connect with </div>
                  <div className='col-md-12 metamask-content py-2'
                    onClick={handleMetamask}
                  >
                    <div className='row justify-content-sm-center '>
                      <div className="col-sm-6 col-lg-12 col-12 d-flex justify-content-center align-items-center">
                        <img
                          style={{ width: '30px', margin: '1rem' }}
                          src={Images.metamask_img}
                          alt='metamask'
                        />
                        <div className="ms-2 fx-bold">MetaMask</div>
                      </div>
                      <div className="col-sm-6 col-lg-12 col-12 d-flex align-items-center justify-content-center">
                        {
                          !account && (
                            <>
                            </>
                          ) || (
                            <>
                              <div className="wallet-address d-flex c-white align-items-center justify-content-center">
                                <div className="ms-2 d-flex align-items-center">
                                  <div className="cursor-default">{etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH</div>
                                </div>
                                <div className="wallet-account c-white ms-2 cursor-default">
                                  {account &&
                                    `${account.slice(0, 6)}...${account.slice(
                                      account.length - 4,
                                      account.length
                                    )}`}
                                </div>
                              </div>
                            </>
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className="error-msg fs-6">{errors.metamask}</div>
                  <div className='form-group mt-3'>
                    <input
                      placeholder='Email'
                      type='text'
                      className='form-control'
                      onChange={e => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="error-msg fs-6">{errors.email}</div>
                  <div className='form-group mt-3'>
                    <input
                      placeholder='Password'
                      type='password'
                      className='form-control'
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                    />
                    <div className="error-msg fs-6">{errors.password}</div>
                  </div>
                  <div className='form-group mt-3'>
                    <button className='btn btn-primary'
                      onClick={handleSubmit}
                    >Sign In</button>
                    <div className='text-center mt-3'>
                      Dont have an account yet?{' '}
                      <Link to='/sign-up'>Sign up now!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
};

export default SignIn;
