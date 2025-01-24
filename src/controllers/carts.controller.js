const cartsManager = require('../data/fs/cartsManager');

class CartsController {
    async createCart(req, res, next) {
        try {
            const { userId } = req.body;
            if (!userId) return res.status(400).json({ error: 'User ID is required' });

            const newCartId = await cartsManager.createCart(userId);
            res.status(201).json({ id: newCartId });
        } catch (error) {
            next(error);
        }
    }

    async getCart(req, res, next) {
        try {
            const cart = await cartsManager.getById(req.params.cid);
            if (!cart) return res.status(404).json({ error: 'Cart not found' });
            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }

    async addProductToCart(req, res, next) {
        try {
            const { quantity } = req.body;
            if (!quantity) return res.status(400).json({ error: 'Quantity is required' });

            const updatedCart = await cartsManager.addProduct(req.params.cid, req.params.pid, quantity);
            if (!updatedCart) return res.status(404).json({ error: 'Cart not found' });

            res.status(200).json(updatedCart);
        } catch (error) {
            next(error);
        }
    }

    async deleteCart(req, res, next) {
        try {
            const deletedId = await cartsManager.deleteCart(req.params.cid);
            if (!deletedId) return res.status(404).json({ error: 'Cart not found' });
            res.status(200).json({ id: deletedId });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CartsController();
