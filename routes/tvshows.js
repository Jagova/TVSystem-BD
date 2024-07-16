const { Router } = require('express');
const { getAllTvShows, getTvShowById, createTvShow, deleteTvShowById, updateTvShowById, likeTvShow, dislikeTvShow } = require('../controllers/TvShows');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');
const router = Router();

router.get("/", getAllTvShows);

router.get("/:id", getTvShowById);

router.post("/", [validateJWT], createTvShow);

router.delete("/:id", [validateJWT], deleteTvShowById);

router.put("/:id", [validateJWT], updateTvShowById);

router.post("/:id/like", [validateJWT], likeTvShow);

router.post("/:id/dislike", [validateJWT], dislikeTvShow);

module.exports = router;
