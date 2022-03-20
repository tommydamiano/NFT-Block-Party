import '../component_styles/FAQ.css';
import '../component_styles/AllButtons.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';

function FAQ() {

  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([])

  useEffect(() => {
    const setQandA = () => {
      setQuestionsAndAnswers([
        ['What does NFT Block Party do?',
        'After logging in with your Twitter account, NFT Block Party enables you to automatically mass-block Twitter users who have made their profile picture a verified NFT (stinky! 🤢)'],
        ['Why does this exist?',
        "I don't actually hate crypto, but I do think that Twitter's implementation of verified NFT profile pictures is stupid - as a result, a mass-blocking tool seemed to be in order. At the end of the day, I just built this because I thought it was funny"],
        ['How does it work?',
        'We have a database with ~1,000 Twitter users that have made their profile pic a verified NFT. When you click our logo on the main page, 100 users are randomly selected from our DB and are automatically blocked from your account. Say goodbye to those hexagonal apes! :)'],
        ['Why does your DB only have ~1,000 users?', 
        "A couple reasons: 1. Not too many users have a verified NFT profile picture because this feature is only available to users who pay for Twitter Blue (who in their right mind is paying for Twitter Blue?) and 2. Due to the limitations of Twitter's API, it's more difficult to programmatically scrape users with NFT profile pics than you might think"],
        ["Your app blocked someone who didn't have an NFT profile pic! What the heck man!",
        "If someone had an NFT profile pic in the past but recently changed it, it's possible that they're still in our DB of users to block (which we update on a weekly basis). Regardless, you probably still want them blocked because they're definitely a major NFT bro 🤡"],
        ['Are you storing my data?', 
        'Yes - name, social security number, credit card information, zodiac sign, that embarrassing photo of you at your HS prom, etc. Just kidding - nothing is being stored. All info related to your Twitter account evaporates into the abyss when you leave this page'],
        ['Are you stinky?',
        'Yes. Very. Uh oh']
      ])
    }
    setQandA()
  }, [])

  return (
    <div className='FAQ'>
      <div className='back-button-container'>
        <Link to='/'><button>Back</button></Link>
      </div>
      <div className='faq-headline-container'>
        <h1>FAQ</h1>
      </div>
      {questionsAndAnswers.map((questionsAndAnswer, index) => (
        <Fade>
          <div className='overall-qa-container'>
            <div className='faq-dummy1'></div>
            <div className='qa-container' key={index}>
              <span className='question'><span className='qa-twitter-blue'>Q:</span> {questionsAndAnswer[0]}</span>
              <span className='answer'><span className='qa-twitter-blue'>A:</span> {questionsAndAnswer[1]}</span>
              <div className='faq-padding'></div>
            </div>
            <div className='faq-dummy2'></div>
          </div>
        </Fade>
      ))}
        
    </div>
  );
}

export default FAQ;
