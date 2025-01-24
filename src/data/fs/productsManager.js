const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');
const filePath = './src/data/fs/products.json';

class ProductsManager {
    async getAll() {
        return fs.readJSON(filePath).catch(() => []);
    }

    async getById(id) {
        const products = await this.getAll();
        return products.find(p => p._id === id) || null;
    }

    async create(data) {
        const products = await this.getAll();
        const newProduct = { _id: uuidv4(), ...data };
        products.push(newProduct);
        await fs.writeJSON(filePath, products);
        return newProduct._id;
    }

    async update(id, newData) {
        const products = await this.getAll();
        const index = products.findIndex(p => p._id === id);
        if (index === -1) return null;
        products[index] = { ...products[index], ...newData };
        await fs.writeJSON(filePath, products);
        return products[index];
    }

    async delete(id) {
        let products = await this.getAll();
        const filtered = products.filter(p => p._id !== id);
        if (filtered.length === products.length) return null;
        await fs.writeJSON(filePath, filtered);
        return id;
    }
}

module.exports = new ProductsManager();
