import React, { useState, useEffect } from 'react';
import Footer from 'components/Footer';
import { formatEther } from "@ethersproject/units";
import { Link, Redirect } from 'react-router-dom';
import Images from 'shared/images';
import { useEthers, useEtherBalance } from '@usedapp/core';
import "./styles.scss";
import { isEmail } from 'shared/kernel/cast';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const BaseUrl = "http://localhost:5000/"
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [useremail, setEmail] = useState('');
  const [confirm_password, setConfirm] = useState('');
  const [val_inite, setinite] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [errors, seteer] = useState(
    {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      metamask: ''
    });


  useEffect(() => {
    if (val_inite == true) {
      validate()
    }

  }, [password, confirm_password, username, useremail, account]);

  function handleSubmit(e) {
    if (validate()) {
      AfterHandle()
    }
    setinite(true);
  }

  function AfterHandle() {
    axios.post(`${BaseUrl}api/users/register`, {
      username: username,
      email: useremail,
      password: password,
      address: account
    })
      .then(res => {
        const { suc, msg } = res.data
        if (suc) {
          setinite(false);
          setRedirect(true);
        } else {
          toast.error("An unexpected error occurred");
          // toast(msg, {
          //   position: toast.POSITION.TOP_RIGHT,
          //   className: 'toast-error',
          //   progressClassName: 'error-progress-bar',
          //   autoClose: 3000,
          //   toastId: 1
          // });
        }
      })
  }
  async function handleConnectWallet() {
    await activateBrowserWallet((error, throwerr) => {
      if (error) {
        alert("Please connect your Metamask")
      }
    });
  }

  function validate() {
    let isValid = true;
    let errMsg = {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      metamask: ''
    }
    if (!account) {
      isValid = false;
      errMsg.metamask = "Please connect your Metamask."
    }
    if (!username) {
      isValid = false;
      errMsg.username = "Please enter your username."
    }

    if (username !== "undefined") {
      const re = /^\S*$/;

      if (username.length < 6 || !re.test(username)) {
        isValid = false;
        errMsg.username = "Please enter valid username.";
      }
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

    if (!confirm_password) {
      isValid = false;
      errMsg.confirm_password = "Please enter your confirm password.";
    }

    if (typeof password !== "undefined") {
      if (password.length < 6) {
        isValid = false;
        errMsg.password = "Please add at least 6 charachter.";
      }
    }

    if (typeof password !== "undefined" && typeof confirm_password !== "undefined") {

      if (password != confirm_password) {
        isValid = false;
        errMsg.confirm_password = "Passwords don't match.";
      }
    }
    seteer(errMsg)
    return isValid;
  }

  if (redirect) {
    return <Redirect to="/sign-in" />
  } else {
    return (
      <>
        <header className='container'>
          <div className='d-flex justify-content-center'>
            <div className='text-center'>
              <h2 className='text-black-50 mx-auto mb-5'>Profile Settings</h2>
            </div>
          </div>
        </header>
        <section className='signup-section' id='signup'>
          <div className='container px-4 px-lg-5'>
            <div className='row gx-4 gx-lg-5'>
              <div className='col-md-10 col-lg-8 mx-auto text-center'>
                <div className='row g-3'>
                  <div className='col-md-12 metamask-div'
                    onClick={handleConnectWallet}
                  >
                    <div className='row justify-content-sm-center '>
                      <div className="col-sm-6 col-12 d-flex ">
                        <span
                          className='fw-bold fs-5'
                          style={{ height: '30px', margin: '1rem auto' }}
                        >Connet your wallet:</span>
                      </div>
                      <div className="col-sm-6 col-12 d-flex justify-content-center align-items-center">
                        {!account && (
                          <>
                            <img
                              style={{ width: '30px', margin: '1rem' }}
                              src={Images.metamask_img}
                              alt='metamask'
                            />
                            <div className="ms-2 fx-bold">MetaMask</div>
                          </>
                        )
                          ||
                          (
                            <>
                              <div className="wallet-info">
                                <div className="wallet-address d-flex c-white">
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
                              </div>
                            </>
                          )
                        }

                      </div>
                    </div>
                  </div>
                  <div className="error-msg fs-6">{errors.metamask}</div>
                  <div className='col-md-12'>
                    <input
                      type='text'
                      placeholder='Full Name'
                      className='form-control'
                      onChange={e => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="error-msg fs-6">{errors.username}</div>
                  <div className='col-md-12'>
                    <input
                      type='email'
                      placeholder='E-mail (ex:john@domain.com)'
                      className='form-control'
                      onChange={e => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="error-msg fs-6">{errors.email}</div>
                  <div className='col-md-12'>
                    <input
                      type='password'
                      placeholder='Password'
                      className='form-control'
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                    />
                    <div className="error-msg fs-6">{errors.password}</div>
                  </div>

                  <div className='col-md-12'>
                    <input
                      type='password'
                      placeholder='Confirm Password'
                      className='form-control'
                      id='inputPassword4'
                      onChange={e => {
                        setConfirm(e.target.value);
                      }}
                    />
                    <div className="error-msg fs-6">{errors.confirm_password}</div>
                  </div>

                  <div className='col-12'>
                    <button className='btn btn-primary'
                      onClick={() => handleSubmit()}
                    >
                      Register Now!
                    </button>
                    <div className='text-center mt-3'>
                      Already have an account?{' '}
                      <Link to='/sign-in'>Sign In!</Link>
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

export default SignUp;
