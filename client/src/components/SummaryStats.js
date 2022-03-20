import '../component_styles/SummaryStats.css';
import '../component_styles/AllButtons.css';
import React from 'react';
import Fade from 'react-reveal/Fade';

function SummaryStats(props) {

    return (
        <div className="SummaryStats">
            {props.showStats ?  <div>
                                    <Fade big>
                                        <div className='headline-container'>
                                            <span>Of the users you blocked:</span>
                                        </div>
                                    </Fade>
                                    <Fade big>
                                        <div className='summary-stats'>
                                            <div className='dummy1'></div> 
                                            <div className='summary-stats-container'>
                                                <span><b>Greatest # of followers:</b> {props.summaryStats['mostFollowers']}</span>
                                                <span className='remove-for-small-phone'><b>Oldest account create date:</b> {props.summaryStats['oldestAcctDate']}</span>
                                                <span><b>Most frequent location:</b> {props.summaryStats['mostPopularLocation']} ({props.summaryStats['usersOfMostPopularLocation']} users)</span>
                                                <span><b>Someone you blocked:</b> <a href={props.summaryStats['linkToProfile']} target= '_blank' rel= 'noreferrer'>{props.summaryStats['randomProfileName']}</a></span>
                                                <p>Click <a href='https://twitter.com/settings/blocked/all' target= '_blank' rel= 'noreferrer'>here</a> to see all the users you blocked!</p>
                                            </div> 
                                            <div className='dummy2'></div> 
                                        </div> 
                                    </Fade>
                                </div>
                                :
                                <div className='not-showing-all-users-container'>
                                    <Fade big>
                                        {/* Using key here forces the component to re-render, so the fade works. I don't know why it works like that :) */}
                                        <span key={props.preStatsText}>{props.preStatsText}</span>
                                    </Fade>
                                </div>
            }
        </div>
    );
}

export default SummaryStats;
