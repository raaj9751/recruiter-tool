// UpdateCandidate.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const UpdateCandidate = ({ match }) => {
    const { id } = useParams(); // Access the dynamic parameter from the URL
    const navigate = useNavigate();
  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    skills_qualifications: '',
    expected_salary: '',
    status: ''
  });

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(`https://recruiter-tool-31hd.onrender.com/candidates/${id}`);
        setCandidate(response.data.candidate);
      } catch (error) {
        console.error('Error fetching candidate:', error);
      }
    };

    fetchCandidate();
  }, [id]);

  const handleInputChange = e => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`https://recruiter-tool-31hd.onrender.com/candidates/${id}`, candidate);
      alert('Candidate details updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating candidate details:', error);
      alert('Failed to update candidate details');
    }
  };

  return (
    <div>
      <h2>Update Candidate Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={candidate.name} onChange={handleInputChange} readOnly/><br />
        <label>Email:</label>
        <input type="email" name="email" value={candidate.email} onChange={handleInputChange} readOnly/><br />
        <label>Phone:</label>
        <input type="text" name="phone" value={candidate.phone} onChange={handleInputChange} readOnly/><br />
       <label>Expected Salary:</label>
        <input type="text" name="expected_salary" value={candidate.expected_salary} onChange={handleInputChange} readOnly/><br />
        <label>Status:</label>
                <select name="status" value={candidate.status} onChange={handleInputChange}>
                    <option value="Contacted">Contacted</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Offer Extended">Offer Extended</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                </select><br /><br />
        <button type="submit">Update Candidate</button>
      </form>
    </div>
  );
};

export default UpdateCandidate;
