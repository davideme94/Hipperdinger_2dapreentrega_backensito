const express = require('express');
const router = express.Router();
const productsRouter = require('./api/products.router');
const cartsRouter = require('./api/carts.router');
const usersRouter = require('./api/users.router');

router.use('/products', productsRouter);
router.use('/carts', cartsRouter);
router.use('/users', usersRouter);

module.exports = router;
