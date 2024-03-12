import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './candidateList.css';
import { Link } from 'react-router-dom';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
        try {
          const response = await axios.get('http://localhost:3012/candidates/getAllCandidates');
          setCandidates(response.data.candidates);

          
        //   if (response && response.data && response.data.candidates) {
        //     const candidatesData = response.data.candidates;
      
        //     const scorePromises = candidatesData.map(async (element) => {
        //       try {
        //         let od =element.candidate_id;
        //         const scoreResponse = await axios.get(`http://localhost:3012/candidates/getScore/${od}`);
        //         return { ...element, score: scoreResponse.data };
        //       } catch (error) {
        //         console.error(`Error fetching score for candidate ${element.id}:`, error);
        //         return { ...element, score: null }; // Handle error gracefully
        //       }
        //     });
      
        //     const candidatesWithScores = await Promise.all(scorePromises);
        //   }
        } catch (error) {
          console.error('Error fetching candidates:', error);
        }
      };
      
    fetchCandidates();
  }, []);

  return (
    <div className={"candidateList"}>
      <h2>Candidate List</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* <div style={{ marginLeft: '10px' }}>
                    <input type="text" placeholder="Search..." />
                </div>
                <div> <button style={{ marginRight: '10px' }}>Search</button></div>
                */}
                <Link to="/candidate/add">
                    <button>Add Candidate</button>
                </Link>
            </div>
      <table className={"table"}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Skills/Qualifications</th>
            <th>Expected Salary</th>
            <th>Status</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate.candidate_id}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.skills}</td>
              <td>{candidate.expected_salary}</td>
              <td>{candidate.status}</td>
              <td>{candidate.scoreVal}</td>
              <td>
                <Link to={`/candidates/${candidate.candidate_id}/update`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;
