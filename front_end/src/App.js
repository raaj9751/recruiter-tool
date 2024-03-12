// FormPage.js

import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CandidateList from './CandidateList';
import UpdateCandidate from './UpdateCandidate';
import FormPage from './FormPage';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/candidate/add' element={<FormPage></FormPage>}/>
          <Route exact path="/" element={<CandidateList></CandidateList>} />
          <Route path="/candidates/:id/update" element={<UpdateCandidate></UpdateCandidate>} />
          </Routes>
  </BrowserRouter>
  );
};


export default App;
