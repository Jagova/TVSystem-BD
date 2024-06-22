const User = require("../models/user");

class UserRepository {

    static async getAll(query) {
        return await User.find(query);
    }

    static async getOne(query) {
        return await User.findOne(query);
    }

    static async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    static async deleteById(id) {
        return await User.deleteOne({ _id: id });
    }

    static async updateById(id, updateData) {
        return await User.updateOne({ _id: id }, updateData);
    }
}

module.exports = { UserRepository };