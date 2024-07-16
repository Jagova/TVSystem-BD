const mongoose = require("mongoose");

const tvShowSchema = mongoose.Schema({
    name: String,
    genre: String,
    image: String,
    episodes: Number,
    year: Number,
    description: String,
    likes: [String]
})

module.exports = mongoose.model("TvShow", tvShowSchema);