import '../component_styles/Home.css';
import React from 'react';
import LandingPage from './LandingPage';
import BlockPage from './BlockPage';

function Home() {

  const token = sessionStorage.getItem('token')
  
  return (
    <div>
      {token ? <BlockPage/> : <LandingPage/>}
    </div>
  );
}

export default Home;
