const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users.controller');

router.post('/', usersController.createUser);
router.get('/', usersController.getUsers);
router.get('/:uid', usersController.getUserById);
router.delete('/:uid', usersController.deleteUser);

module.exports = router;
