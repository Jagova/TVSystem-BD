const { Router } = require('express');
const { getAllTvShows, getTvShowById, createTvShow } = require('../controllers/TvShows');
const { validateJWT } = require('../middlewares/verifyJWT');
const { verifyAdminRole } = require('../middlewares/verifyAdminRole');
const router = Router();

router.get("/", [validateJWT], getAllTvShows);

module.exports = router;