import '../component_styles/LandingPage.css';
import '../component_styles/AllButtons.css';
import '../index.css';
import logo from '../img/logo.png';
import twitterLogo from '../img/twitter.png';
import React from 'react';
import { authentication } from './firebase-config'
import { Link } from 'react-router-dom';
import { TwitterAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult  } from "firebase/auth";
import Footer from './Footer';
import Fade from 'react-reveal/Fade';

function LandingPage() {

  const logIn = async () => {
    const provider = new TwitterAuthProvider()
    const response = await signInWithPopup(authentication, provider)
    const credential = TwitterAuthProvider.credentialFromResult(response);
    console.log(response.user)

    // const provider = new TwitterAuthProvider()
    // signInWithRedirect(authentication, provider)
    // const response = await getRedirectResult(authentication)
    // const credential = TwitterAuthProvider.credentialFromResult(response)
    // console.log(response.user)

    sessionStorage.setItem('token', credential.accessToken)
    sessionStorage.setItem('secret', credential.secret)
    sessionStorage.setItem('userName', response.user.displayName)
    sessionStorage.setItem('user@', response.user.reloadUserInfo.screenName)
    sessionStorage.setItem('profilePicURL', response.user.photoURL)
    refreshPage()
  }

  const refreshPage = () => {
    window.location.reload()
  }
  
  return (
    <div className='LandingPage'>
      <div className='faq-button-container'>
        <Link to='/faq'><button>FAQ</button></Link>
      </div>
      <Fade>
        <div className="landing-page-main-container" >
          <div className='landing-header-container'>
            <h1>NFT Block Party</h1>
            <img src={logo} alt='logo'></img>
          </div>
          <div className='landing-subtext-container'>
            <span>Block all NFT profile picture users from your Twitter timeline</span>
          </div>
          <div className='landing-button-container' onClick={() => logIn()}>
            <img src={twitterLogo} alt='twitterLogo'></img>
            <span>Log in with Twitter</span>
          </div>
        </div>
      </Fade>
      <Footer/>
    </div>
  );
}

export default LandingPage;
