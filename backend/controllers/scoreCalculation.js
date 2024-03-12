const { ScoreCondition, CandidateSkills }  = require('../models/candidate');

const getScore = async (req, res) => {
    const { candidateId } = req;
    calculateScore(req, res);
}

async function calculateScore(candidateId, res) {
    try {
        const experienceData = await CandidateSkills.findAll({
            where: {
              candidate_id: candidateId
            }
          });        // Query all score conditions from the database based on technology
          let score = 0;

       experienceData.forEach(experience=>{
        const conditions =  ScoreCondition.findAll({
            where: {
              technology: {
                [Op.like]: `%${experience.skill}%` // Matches any technology containing the dynamic value
              }
            }
          });
      conditions.forEach(condition => {
        const symbol = condition.condition.charAt(0); // Get the first character as the symbol
        const range = parseInt(condition.condition.slice(1)); // Get the remaining characters as the range
        const years = experience.years;
        const yearsValue = parseInt(years);
        if (!isNaN(yearsValue)) {
            if ((symbol === '>=' && yearsValue >= range) || 
                (symbol === '>' && yearsValue > range) || 
                (symbol === '<' && yearsValue < range) || 
                (symbol === '<=' && yearsValue <= range)) {
                score+=condition.score;
            } // Add other conditions as needed
        } else {
            console.error('Invalid years value:', years);
            // Handle invalid years value
        }
    });
       })   

        return score;
    } catch (error) {
        console.error('Error fetching candidates:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to fetch candidates'
        });
    }
}

module.exports = {
    getScore
  };
  