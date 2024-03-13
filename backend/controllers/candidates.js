// controllers/candidates.js

const Candidate  = require('../models/candidate');
const CandidateSkills = require('../models/candidate');
// CRUD functions for candidates
const getAllCandidates = async (req, res) => {
  try {
    // Fetch all candidates from the database
    const candidates = await Candidate.findAll({
      include: [
        {
          model: CandidateSkills,
          required: false, // Use 'required: false' for a left join
          attributes: ["skill", "years"], // Optionally specify which attributes to include from the associated model
        },
      ],
    });
    //    candidates.array.forEach(candidate => {
    //     if(candidate.skill!==undefined && candidate.years!==undefined){
    //         if("Node.js".includes(candidate.skill))
    //     }
    //    });
    //   candidates.forEach(element => {
    //     newCandidates.push({...element, score: getScore(element.candidate_id)});
    //   });
    // Send the response with the list of candidates
    let newCandidates = [];
    candidates.forEach((candidate) => {
      let step = 0;
      if (candidate.candidate_experiences !== undefined) {
        candidate.candidate_experiences.forEach((experience) => {
          if (
            (experience.skill).includes("react js") ||
            (experience.skill).includes("node js")
          ) {
            let years = experience.years;
            if (years < 1) {
              step += 1;
            } else if (years >= 1 && years <= 2) {
              step += 2;
            } else {
              step += 3;
            }
          }
        });
        newCandidates.push({ ...candidate, scoreVal: step });
      }
    });
    const candidatesJSON = newCandidates.map(candidate => ({
        candidate_id: candidate.dataValues.candidate_id,
        name: candidate.dataValues.name,
        // Include other candidate attributes as needed
        skills: candidate.candidate_experiences.map(exp=> (exp.years + ' year' + (exp.years === 1 ? '' : 's') + ' of experience in ' + exp.skill+" ,")),
        scoreVal: candidate.scoreVal,
        email: candidate.dataValues.email,
        phone: candidate.dataValues.phone,
        status: candidate.dataValues.status,
        expected_salary: candidate.dataValues.expected_salary
      }));
    res.status(200).json({
      success: true,
      candidates: candidatesJSON
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch candidates",
    });
  }
};

function calculateExperienceScore(years) {
  if (years < 1) {
    return 1;
  } else if (years >= 1 && years <= 2) {
    return 2;
  } else {
    return 3;
  }
}
// Get candidate by ID
const getCandidateById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch candidate by ID from the database
    const candidate = await Candidate.findByPk(id);

    // If candidate not found, return 404 error
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    // Return success response with the candidate details
    res.status(200).json({
      success: true,
      candidate: candidate,
    });
  } catch (error) {
    console.error("Error fetching candidate:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch candidate",
    });
  }
};

const updateCandidate = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, skills_qualifications, expected_salary, status } =
    req.body;

  try {
    // Find the candidate by ID
    const candidate = await Candidate.findByPk(id);

    // If candidate not found, return 404 error
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      });
    }

    // Update candidate details
    candidate.name = name;
    candidate.email = email;
    candidate.phone = phone;
    candidate.skills_qualifications = skills_qualifications;
    candidate.expected_salary = expected_salary;
    candidate.status = status;

    // Save the updated candidate details to the database
    await candidate.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: "Candidate details updated successfully",
      candidate: candidate,
    });
  } catch (error) {
    console.error("Error updating candidate details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update candidate details",
    });
  }
};
const createCandidate = async (req, res) => {
  const { name, email, phone, skills_qualifications, expected_salary, status } =
    req.body;

  try {
    const candidate = await Candidate.create({
      name: req.body.name,
      expected_salary: req.body.expectedSalary,
      status: req.body.status,
      email: req.body.email,
      phone: req.body.phone,
    });

    const candidateId = candidate.candidate_id;

    const { experiences } = req.body;

    const skillsWithCandidateId = experiences.map((skill) => ({
      ...skill,
      candidate_id: candidateId,
    }));

    // Save the skills associated with the candidate
    await CandidateSkills.bulkCreate(skillsWithCandidateId);

    res.status(201).json({
      success: true,
      message: "Candidate created successfully",
    });
  } catch (error) {
    console.error("Error creating candidate:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create candidate",
    });
  }
};

const deleteCandidate = async (req, res) => {
  // Delete a candidate from the database
};

module.exports = {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
};
