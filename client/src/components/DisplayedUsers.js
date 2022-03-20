import '../component_styles/DisplayedUsers.css';
import '../component_styles/AllButtons.css';
import boredApe from '../img/boredape.jpg';
import boredApe2 from '../img/boredape2.png';
import React from 'react';

function DisplayedUsers(props) {

    return (
        <div className="DisplayedUsers">
            {props.showUsersBeingBlocked ?  <div className='users-being-blocked-container'>
                                                <div className='content-div'>
                                                    <span>Blocking {props.currentUsername}</span>
                                                    <img src={props.currentProfilePicture} 
                                                        onError={e => Math.round(Math.random()) >= 0.5 ? e.target.src = boredApe : e.target.src = boredApe2 }
                                                        alt='nftBroPic'>       
                                                    </img>
                                                </div>
                                            </div> : ''}
        </div>
    );
}

export default DisplayedUsers;
