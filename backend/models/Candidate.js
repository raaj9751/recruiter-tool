// models/Candidate.js

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Your Sequelize instance

const Candidate = sequelize.define('candidates', {
   candidate_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skills_qualifications: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  expected_salary: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Contacted'
  }
}, {
    timestamps: true // Enable timestamps
  });

  const CandidateSkills = sequelize.define('candidate_experiences', {
    candidate_id: DataTypes.INTEGER,
    experience_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    years: DataTypes.INTEGER,
    skill: DataTypes.STRING
}, {
    timestamps: false // Enable timestamps
  }
);

const ScoreCondition = sequelize.define('experience_data', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    technology: {
      type: DataTypes.STRING,
      allowNull: false
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false
    },
    experience_years: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
  , {
    timestamps: false // Enable timestamps
  }
);
// Define the association
Candidate.hasMany(CandidateSkills, { foreignKey: 'candidate_id' });
CandidateSkills.belongsTo(Candidate, { foreignKey: 'candidate_id' });

module.exports = {
    Candidate,
    CandidateSkills,
    ScoreCondition
};