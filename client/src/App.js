import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FAQ from './components/FAQ';
import BlockPage from './components/BlockPage';


function App() {
  
  return (
    <Router basename='/'>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={Home()} />
          {/* <Route exact path='/block' element={BlockPage()} /> */}
          <Route exact path='/faq' element={FAQ()} />
        </Routes>
      </div>
  </Router>
  );
}

export default App;
