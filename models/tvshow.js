const mongoose = require("mongoose");

const tvShowSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    genre: String,
    image: String,
    episodes: Number,
    year: Number,
    description: String
})

module.exports = mongoose.model("TvShow", tvShowSchema);