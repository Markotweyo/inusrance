//Defines routes for managing policies

const express = require('express');
const { getAllPolicies, getPoliciesByCategory, createPolicy } = require('../controllers/policyController');

const router = express.Router();

router.get('/', getAllPolicies);
router.get('/:category', getPoliciesByCategory);
router.post('/', createPolicy);

module.exports = router;
