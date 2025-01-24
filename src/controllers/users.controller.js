const usersManager = require('../data/fs/usersManager');

class UsersController {
    async createUser(req, res, next) {
        try {
            const { name, email, age, role } = req.body;

            if (!name || !email) {
                return res.status(400).json({ error: 'Name and Email are required' });
            }

            const newUserId = await usersManager.createUser({ name, email, age, role });
            res.status(201).json({ id: newUserId });
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await usersManager.getAll();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req, res, next) {
        try {
            const user = await usersManager.getById(req.params.uid);
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const deletedId = await usersManager.deleteUser(req.params.uid);
            if (!deletedId) return res.status(404).json({ error: 'User not found' });
            res.status(200).json({ id: deletedId });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UsersController();
