const { response, request } = require("express");
const { TvShowRepository } = require("../repositories/tvShow");

const getAllTvShows = async (req = request, res = response) => {

    const { searchTerm } = req.query;

    try {
        const result = await TvShowRepository.getAll({ name: RegExp(searchTerm) });
        res.status(200).json({
            TvShowsList: result
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener los datos",
        });
    }
}


module.exports = {
    getAllTvShows
}