import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Repository from './pages/Repository';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/repository/:repository' element={<Repository />} />
      </Routes>
    </Router>
  );
}

export default App;
