const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

const filePath = './src/data/fs/carts.json';

class CartsManager {
    async getAll() {
        return fs.readJSON(filePath).catch(() => []);
    }

    async getById(id) {
        const carts = await this.getAll();
        return carts.find(cart => cart._id === id) || null;
    }

    async createCart(userId) {
        const carts = await this.getAll();
        const newCart = { _id: uuidv4(), userId, products: [] };
        carts.push(newCart);
        await fs.writeJSON(filePath, carts);
        return newCart._id;
    }

    async addProduct(cartId, productId, quantity) {
        const carts = await this.getAll();
        const cartIndex = carts.findIndex(cart => cart._id === cartId);
        if (cartIndex === -1) return null;

        const existingProduct = carts[cartIndex].products.find(p => p.productId === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            carts[cartIndex].products.push({ productId, quantity });
        }

        await fs.writeJSON(filePath, carts);
        return carts[cartIndex];
    }

    async deleteCart(id) {
        let carts = await this.getAll();
        const filtered = carts.filter(cart => cart._id !== id);
        if (filtered.length === carts.length) return null;
        await fs.writeJSON(filePath, filtered);
        return id;
    }
}

module.exports = new CartsManager();
