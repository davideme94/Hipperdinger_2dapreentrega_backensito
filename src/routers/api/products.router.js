const express = require('express');
const router = express.Router();
const productsController = require('../../controllers/products.controller');

router.post('/', productsController.create);
router.get('/', productsController.getAll);
router.get('/:pid', productsController.getOne);
router.put('/:pid', productsController.update);
router.delete('/:pid', productsController.delete);

module.exports = router;
