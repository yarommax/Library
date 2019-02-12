const express = require('express');
const controller = require('../controllers/authors')
const router = express.Router();


router.get('/', controller.getAuthors);
router.get('/:id', controller.getAuthorById);
router.post('/', controller.createAuthor);
router.patch('/:id', controller.updateAuthor);
router.delete('/:id', controller.removeAuthor);



module.exports = router;