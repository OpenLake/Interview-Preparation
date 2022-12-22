const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/:que_id', commentController.getComments);
router.post('/post', commentController.postComment);

module.exports = router;
