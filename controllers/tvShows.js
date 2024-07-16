const { response, request } = require("express");
const { TvShowRepository } = require("../repositories/tvShow");

const getAllTvShows = async (req = request, res = response) => {
    const { searchTerm } = req.query;
    try {
        const result = await TvShowRepository.getAll({ name: RegExp(searchTerm) }, "name image likes");
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener los datos",
        });
    }
};

const getTvShowById = async (req = request, res = response) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            msg: "Id requerido",
        });
        return;
    }
    try {
        const result = await TvShowRepository.getById(id);
        if (result === null) {
            res.status(404).json({
                msg: "No se encontró el programa de televisión",
            });
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener los datos",
        });
    }
};

const createTvShow = async (req = request, res = response) => {
    const { name, year, episodes, image, description, genre } = req.body;
    const tvShowData = { name, year, episodes, image, description, genre };

    if (!name || !year || !episodes || !image || !description || !genre) {
        return res.status(400).json({
            msg: "Información incompleta",
        });
    }

    try {
        const savedTvShow = await TvShowRepository.create(tvShowData);
        res.status(201).json({
            msg: "Programa de televisión agregado exitosamente",
            tvShow: savedTvShow
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al agregar el programa de televisión",
        });
    }
};

const deleteTvShowById = async (req = request, res = response) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            msg: "Id requerido",
        });
    }
    try {
        const result = await TvShowRepository.deleteById(id);
        if (result?.deletedCount === 1) {
            res.status(200).json({
                msg: "Programa de televisión eliminado exitosamente",
            });
        } else {
            res.status(404).json({
                msg: "Programa de televisión no encontrado",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al eliminar el programa de televisión",
        });
    }
};

const updateTvShowById = async (req, res) => {
    const { id } = req.params;
    const { name, year, episodes, image, description, genre } = req.body;

    if (!id) {
        return res.status(400).json({
            msg: "Falta el id",
        });
    }

    const updateData = { name, year, episodes, image, description, genre };

    Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined) {
            delete updateData[key];
        }
    });

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
            msg: "No hay datos para actualizar",
        });
    }

    try {
        const result = await TvShowRepository.updateById(id, updateData);
        if (result?.modifiedCount === 1) {
            res.status(200).json({
                msg: "Programa de televisión actualizado exitosamente",
            });
        } else {
            res.status(404).json({
                msg: "Programa de televisión no encontrado o sin cambios",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al actualizar el programa de televisión",
        });
    }
};

const likeTvShow = async (req = request, res = response) => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!id || !userId) {
        return res.status(400).json({
            msg: "Id del programa de televisión y del usuario son requeridos",
        });
    }

    try {
        const tvShow = await TvShowRepository.getById(id);
        console.log(tvShow);

        if (!tvShow) {
            return res.status(404).json({
                msg: "Programa de televisión no encontrado",
            });
        }

        if (!tvShow.likes.includes(userId)) {
            tvShow.likes.push(userId);
            await TvShowRepository.updateById(id, { likes: tvShow.likes });
        }

        res.status(200).json({
            msg: "Like agregado exitosamente",
            likes: tvShow.likes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al agregar el like",
        });
    }
};

const dislikeTvShow = async (req = request, res = response) => {
    const { id } = req.params;
    const { userId } = req.body;

    if (!id || !userId) {
        return res.status(400).json({
            msg: "Id del programa de televisión y del usuario son requeridos",
        });
    }

    try {
        const tvShow = await TvShowRepository.getById(id);
        if (!tvShow) {
            return res.status(404).json({
                msg: "Programa de televisión no encontrado",
            });
        }

        if (tvShow.likes.includes(userId)) {
            tvShow.likes = tvShow.likes.filter(like => like !== userId);
            await TvShowRepository.updateById(id, { likes: tvShow.likes });
        }

        res.status(200).json({
            msg: "Like eliminado exitosamente",
            likes: tvShow.likes
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error al eliminar el like",
        });
    }
};

module.exports = {
    getAllTvShows,
    createTvShow,
    getTvShowById,
    deleteTvShowById,
    updateTvShowById,
    likeTvShow,
    dislikeTvShow
};
