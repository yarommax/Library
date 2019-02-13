const express = require('express');
const passport = require('passport');
const controller = require('../controllers/authors')
const router = express.Router();


router.get('/', passport.authenticate('jwt',{session: false}), controller.getAuthors);
router.get('/:id', passport.authenticate('jwt',{session: false}), controller.getAuthorById);
router.post('/', passport.authenticate('jwt',{session: false}), controller.createAuthor);
router.patch('/:id', passport.authenticate('jwt',{session: false}), controller.updateAuthor);
router.delete('/:id', passport.authenticate('jwt',{session: false}), controller.removeAuthor);



module.exports = router;