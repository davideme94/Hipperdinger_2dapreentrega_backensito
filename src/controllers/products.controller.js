const productsManager = require('../data/fs/productsManager');

class ProductsController {
    async create(req, res, next) {
        try {
            const { title, category, thumbnails, price, stock } = req.body;
            if (!title) return res.status(400).json({ error: 'Title is required' });
            const newId = await productsManager.create({ title, category, thumbnails, price, stock });
            res.status(201).json({ id: newId });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const products = await productsManager.getAll();
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const product = await productsManager.getById(req.params.pid);
            if (!product) return res.status(404).json({ error: 'Product not found' });
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const updatedProduct = await productsManager.update(req.params.pid, req.body);
            if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
            res.status(200).json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const deletedId = await productsManager.delete(req.params.pid);
            if (!deletedId) return res.status(404).json({ error: 'Product not found' });
            res.status(200).json({ id: deletedId });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductsController();
