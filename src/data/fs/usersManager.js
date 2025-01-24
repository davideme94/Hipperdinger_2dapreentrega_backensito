const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

const filePath = './src/data/fs/users.json';

class UsersManager {
    async getAll() {
        return fs.readJSON(filePath).catch(() => []);
    }

    async getById(id) {
        const users = await this.getAll();
        return users.find(user => user._id === id) || null;
    }

    async createUser(data) {
        const users = await this.getAll();

        // Validar que el email sea único
        if (users.some(user => user.email === data.email)) {
            throw new Error('Email already exists');
        }

        const newUser = {
            _id: uuidv4(),
            name: data.name,
            email: data.email,
            age: data.age || null,
            role: data.role || "customer", // Valor por defecto
        };

        users.push(newUser);
        await fs.writeJSON(filePath, users);
        return newUser._id;
    }

    async deleteUser(id) {
        let users = await this.getAll();
        const filtered = users.filter(user => user._id !== id);
        if (filtered.length === users.length) return null;
        await fs.writeJSON(filePath, filtered);
        return id;
    }
}

module.exports = new UsersManager();
