// FormPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './FormPage.css';
import { useNavigate } from 'react-router-dom';
const FormPage = () => {
  // const history = useHistory();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    experiences: [{ years: '', skill: '' }],
    status: '',
    expectedSalary: ''
  });

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...candidate.experiences];
    list[index][name] = value;
    setCandidate({ ...candidate, experiences: list });
  };

  const handleAddExperience = () => {
    setCandidate({ ...candidate, experiences: [...candidate.experiences, { years: '', skill: '' }] });
  };

  const handleRemoveExperience = index => {
    const list = [...candidate.experiences];
    list.splice(index, 1);
    setCandidate({ ...candidate, experiences: list });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3012/candidates/createCanditate', candidate);
      alert('Candidate added successfully');
      setCandidate({
        name: '',
        email: '',
        phone: '',
        experiences: [{ years: '', skill: '' }],
        status: '',
        expectedSalary: ''
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding candidate:', error);
      alert('Failed to add candidate');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Candidate</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={candidate.name} onChange={e => setCandidate({ ...candidate, name: e.target.value })} required />
        <input type="email" name="email" placeholder="Email" value={candidate.email} onChange={e => setCandidate({ ...candidate, email: e.target.value })} required />
        <input type="text" name="phone" placeholder="Phone" value={candidate.phone} onChange={e => setCandidate({ ...candidate, phone: e.target.value })} required />
        
        <h2>Skills/Qualifications</h2>
        <div className="experiences-container">
          {candidate.experiences.map((experience, index) => (
            <div key={index} className="experience-group">
              <div>
                <input type="number" name="years" placeholder="Years" value={experience.years} onChange={e => handleInputChange(index, e)} required />
              </div>
              <div>
                <input type="text" name="skill" placeholder="Skill" value={experience.skill} onChange={e => handleInputChange(index, e)} required />
              </div>
              {index === candidate.experiences.length - 1 && <button type="button" onClick={handleAddExperience}>Add Experience</button>}
              {index > 0 && <button type="button" onClick={() => handleRemoveExperience(index)}>Remove Experience</button>}
            </div>
          ))}
        </div>
        <br></br>
        <input type="number" name="expected_salary" placeholder="Expected Salary" value={candidate.expectedSalary} onChange={e => setCandidate({ ...candidate, expectedSalary: e.target.value })} required />

        <select name="status" value={candidate.status} onChange={e => setCandidate({ ...candidate, status: e.target.value })} required>
          <option value="">Select Status</option>
          <option value="Contacted">Contacted</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Offer Extended">Offer Extended</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button type="submit">Add Candidate</button>
      </form>
    </div>
  );
};

export default FormPage;
