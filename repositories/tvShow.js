const TvShow = require('../models/tvShow');

class TvShowRepository {

    static async getAll(query) {
        return await TvShow.find(query);
    }

    static async getOne(query) {
        return await TvShow.findOne(query);
    }

    static async create(userData) {
        const tvShow = new TvShow(userData);
        return await tvShow.save();
    }

    static async deleteById(id) {
        return await TvShow.deleteOne({ _id: id });
    }

    static async updateById(id, updateData) {
        return await TvShow.updateOne({ _id: id }, updateData);
    }
}

module.exports = { TvShowRepository };