const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionsController');

router.post('/post', questionController.postQuestion);
router.get('/:type', questionController.getQuestions);
router.get('/que/:id', questionController.getOneQuestion)

module.exports = router;
