const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionsController');

router.post('/post', questionController.postQuestion);
router.get('/:type', questionController.getQuestions);
router.get('/que/:id', questionController.getOneQuestion);
router.put('/que/:que_id/like', questionController.likeQuestion);
router.put('/que/:que_id/unlike', questionController.unlikeQuestion);

module.exports = router;
