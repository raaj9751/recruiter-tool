// routes/candidates.js

const express = require('express');
const router = express.Router();
const candidatesController = require('../controllers/candidates'); // Import candidates controller
const sc0reCalculation = require('../controllers/scoreCalculation'); // Import candidates controller

// CRUD routes for candidates
router.get('/getScore/:candidateId', sc0reCalculation.getScore);
router.get('/getAllCandidates', candidatesController.getAllCandidates);
router.get('/:id', candidatesController.getCandidateById);
router.post('/createCanditate', candidatesController.createCandidate);
router.put('/:id', candidatesController.updateCandidate);
router.delete('/:id', candidatesController.deleteCandidate);

module.exports = router;
