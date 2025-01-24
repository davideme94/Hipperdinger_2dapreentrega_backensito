const express = require('express');
const router = express.Router();
const productsManager = require('../data/fs/productsManager');
const cartsManager = require('../data/fs/cartsManager');
const usersManager = require('../data/fs/usersManager');

router.get('/', (req, res) => {
    res.render('home', { title: "Home" });
});

router.get('/products', async (req, res) => {
    const products = await productsManager.getAll();
    res.render('products', { title: "Products", products });
});

router.get('/carts', async (req, res) => {
    const carts = await cartsManager.getAll();
    res.render('carts', { title: "Carts", carts });
});

router.get('/users', async (req, res) => {
    const users = await usersManager.getAll();
    res.render('users', { title: "Users", users });
});

module.exports = router;
