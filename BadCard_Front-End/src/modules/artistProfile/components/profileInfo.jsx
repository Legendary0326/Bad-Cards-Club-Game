import Textarea from 'components/TextArea';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import '../styles.scss';

const ProfileInfo = () => {
  let history = useHistory();
  const BaseUrl = "http://localhost:5000/"
  const [username, setName] = useState('');
  const [useremail, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [val_inite, setinite] = useState(false);
  const [account, setaccount] = useState("");
  const [errors, seteer] = useState(
    {
      username: '',
      email: '',
      bio: '',
      metamask: ''
    });


  useEffect(() => {
    const address = localStorage.getItem('walletaddress');
    console.log("profile:1", address);
    setaccount(address);
    return () => {
    }
  }, [])

  useEffect(() => {
    if (val_inite == true) {
      validate()
    }

  }, [bio, username, useremail, account]);

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
      bio: bio,
      address: account
    })
      .then(res => {
        const { suc, msg, err } = res.data
        if (suc) {
          setinite(false);
          history.push("/");
        } else {
          console.log("An unexpected error occurred");
          let errMsg = {
            username: '',
            email: '',
            bio: '',
            metamask: ''
          }
          if (err === "mask") {
            errMsg.metamask = msg
            seteer(errMsg);
          } else if (err === "email") {
            errMsg.email = msg
            seteer(errMsg);
          }
        }
      })
  }

  function validate() {
    let isValid = true;
    let errMsg = {
      username: '',
      email: '',
      bio: '',
      metamask: ''
    }
    if (!localStorage.getItem("walletaddress")) {
      isValid = false;
      errMsg.metamask = "Please connect your Metamask."
    }
    if (!bio) {
      isValid = false;
      errMsg.bio = "Please write your story."
    }
    if (!username) {
      isValid = false;
      errMsg.username = "Please enter your username."
    }

    if (username !== "undefined") {
      const re = /^\S*$/;

      if (username.length < 6 || !re.test(username)) {
        isValid = false;
        errMsg.username = "Please enter username. May be over 6 characters.";
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
    seteer(errMsg)
    return isValid;
  }


  return (
    <div className='row justify-content-center'>
      <div className='col-lg-8 mb-4'>
        {/* <div className='form-group'>
          <div className='userDetails myProfile'>
            <div className='userProfilePicture' style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcg4Y51XjQ-zSf87X4nUPTQzsF83eFdZswTg&usqp=CAU)' }} ></div>
          </div>
        </div> */}
        <div className='form-row'>
          <div className='form-group col-md-12 '>
            <div className='inputUserName4 fs-5 fw-bold mb-2 cursor-default mb-2'>UserName</div>
            <input
              placeholder='Enter username'
              className='form-control'
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="error-msg fs-6">{errors.username}</div>
          <div className='form-group col-md-12'>
            <div className='inputUserName4 fs-5 fw-bold mb-2 cursor-default'>Bio</div>
            <textarea
              className='form-control'
              placeholder="Tell the world your story!"
              onChange={e => {
                setBio(e.target.value);
              }}
            />
          </div>
          <div className="error-msg fs-6">{errors.bio}</div>
          <div className='form-group col-md-12 '>
            <div className='inputEmail4 fs-5 fw-bold mb-2 cursor-default'>Email Address</div>
            <input
              type='email'
              placeholder='Enter email (ex:john@domain.com)'
              className='form-control'
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="error-msg fs-6">{errors.email}</div>
          <div className='form-group col-md-12'>
            <div className='inputAddress fs-5 fw-bold mb-2 cursor-default'>Wallet Address</div>
            <div
              className='form-control'
            >{account}
            </div>
          </div>
          <div className="error-msg fs-6 mb-1">{errors.metamask}</div>
        </div>
        {/* <div className='form-row'>
          <div className='form-group col-md-6'>
            <div className='inputRole fs-5 fw-bold'>Role</div>
            <input
              type='text'
              className='form-control'
              id='inputRole'
              disabled
              value='Admin'
            />
          </div>
          <div className='form-group col-md-6'>
            <span className='inputState'>State</span>
            <select id='inputState' className='form-control'>
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
        </div> */}

        <div className='form-group text-center mt-2'>
          <button type="button" className='btn btn-primary'
            onClick={() => handleSubmit()}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileInfo;
