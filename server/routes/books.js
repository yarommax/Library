const express = require('express');
const passport = require('passport');
const controller = require('../controllers/books');
const router = express.Router();


router.get('/', passport.authenticate('jwt',{session: false}), controller.getBooks);
router.get('/:id', passport.authenticate('jwt',{session: false}), controller.getBookById);
router.post('/', passport.authenticate('jwt',{session: false}), controller.createBook);
router.patch('/:id', passport.authenticate('jwt',{session: false}), controller.updateBook);
router.delete('/:id', passport.authenticate('jwt',{session: false}), controller.removeBook);



module.exports = router;