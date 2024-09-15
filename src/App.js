import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Repository from './pages/Repository';
import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/repository/:repository' element={<Repository />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
