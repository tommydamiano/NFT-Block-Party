import '../component_styles/BlockPage.css';
import '../component_styles/AllButtons.css';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DisplayedUsers from './DisplayedUsers';
import SummaryStats from './SummaryStats';
import Footer from './Footer';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';

function BlockPage() {

    // const [userName, setUserName] = useState('')
    const [userScreenName, setUserScreenName] = useState('')
    const [profilePicURL, setProfilePicURL] = useState('')
    const [currentUsername, setCurrentUsername] = useState('Stinky_NFT_Man')
    const [currentProfilePicture, setCurrentProfilePicture] = useState('https://news.artnet.com/app/news-upload/2022/01/TK-Bored-Ape.jpg')
    const [showUsersBeingBlocked, setShowUsersBeingBlocked] = useState(false)
    const [preStatsText, setPreStatsText] = useState('')
    const [showStats, setShowStats] = useState(false)
    const [transitionToStats, setTransitionToStats] = useState(false)
    const [summaryStats, setSummaryStats] = useState('')
    const [buttonPresses, setButtonPresses] = useState(0)
    const [spinningButton, setSpinningButton] = useState('')
    const [removeButton, setRemoveButton] = useState('')
    const [removeInstructions, setRemoveInstructions] = useState('')
    // const [seconds, setSeconds] = useState('5')

    useEffect(() => {
        const getUserInfo = () => {
            // setUserName(sessionStorage.getItem('userName'))
            setUserScreenName(sessionStorage.getItem('user@'))
            setProfilePicURL(sessionStorage.getItem('profilePicURL')) 
        }
        getUserInfo()
    }, [])

    const logOut = () => {
        sessionStorage.setItem('token', '')
        sessionStorage.setItem('secret', '')
        sessionStorage.setItem('userName', '')
        sessionStorage.setItem('user@', '')
        sessionStorage.setItem('profilePicURL', '')
        window.location.reload()
    }

    const blockUser = async () => {
        console.log(buttonPresses)
        if (buttonPresses > 0) {
            return
        } else {
            setButtonPresses(buttonPresses + 1)
            const token = sessionStorage.getItem('token')
            const secret = sessionStorage.getItem('secret')
            // https://nft-block-party.herokuapp.com/blockUser
            const response =  await fetch(`https://nft-block-party.herokuapp.com/blockUser`, {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: token,
                secret: secret,
                userScreenName: userScreenName})
            })
            setShowUsersBeingBlocked(true)
            const data = await response.json()
            const usersToDisplay = data['usersToBlock']
            const summaryStats = data['summaryStats']
            setSummaryStats(summaryStats)
            displayUsernames(usersToDisplay)
            setSpinningButton('-is-spinning')
        }
    }

    const displayUsernames = async (usersToDisplay) => {
        for (let userIndex in usersToDisplay) {
            if (userIndex > 110) {
                break
            }
            setTimeout(() => {
                setCurrentUsername(usersToDisplay[userIndex]['username'])
                setCurrentProfilePicture(usersToDisplay[userIndex]['profile_pic_url'])
            }, userIndex * 160)
        }
        displayPostBlockText()
    }

    const displayPostBlockText = async () => {
        // Set timeout to the amount of time it takes the previous function to finish displaying users 
        setTimeout(() => {
            setTransitionToStats(true)
            setCurrentUsername('')
            setCurrentProfilePicture('')

            const textToDisplay = [
                "To save time, not going to show all the users we're blocking ツ", 
                "Rest assured, they will be eradicated from your timeline",
                "Hold tight, almost done...",
                "Calculating summary stats..."
            ]

            for (let textToDisplayIndex in textToDisplay) {
                setTimeout(() => {
                    setPreStatsText(textToDisplay[textToDisplayIndex])
                }, textToDisplayIndex * 3000)
            }
        }, 11000)

        // 23,000 = 11,000 + (3000 * 4)
        setTimeout(() => {
            setShowUsersBeingBlocked(false)
            setShowStats(true)
            setSpinningButton('')
            setRemoveButton('-remove')
            setRemoveInstructions('-remove')
        }, 23000)
    }

    // const countForSpinnerAnimation = () => {
    //     let root = document.documentElement;
    //     let x = 1
    //     for (let i = 5; i > 0; i--) {
    //         setInterval(() => {
    //             root.style.setProperty('--change', 359 * x + 'deg');
    //             x += 1
    //             console.log(x)
    //         }, 2000 * x)
    //     }
    // }

    return (
        <div className="BlockPage">
            <div className='log-out-button-container'>
                <button onClick={() => logOut()}>Log Out</button>
                <Link to='/faq'><button>FAQ</button></Link>
            </div>
            <Fade>
                <div className='greet-user-container'>
                    <h1>Hi <a href={`https://twitter.com/${userScreenName}`} target= '_blank' rel="noreferrer">@{userScreenName}</a></h1>
                    <img src={profilePicURL} alt='proPic'></img>
                </div>
                <div className={`instructions-container${removeInstructions}`}>
                    <span>Click the ape to obliterate all NFT profile picture users from your timeline</span>
                </div>
            </Fade>
            <Slide left>
            <div className={`block-button-container${spinningButton}${removeButton}`}>
                <img onClick={()=> blockUser()} src={logo} alt='logo'></img>
            </div>
            {transitionToStats ? <SummaryStats preStatsText={preStatsText} showStats={showStats} summaryStats={summaryStats}/> :
                                 <DisplayedUsers showUsersBeingBlocked={showUsersBeingBlocked} currentUsername={currentUsername} currentProfilePicture={currentProfilePicture}/>}
            </Slide>
            <Footer />
        </div>
    );
}

export default BlockPage;
