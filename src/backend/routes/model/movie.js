// models/movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  director: {
    type: String,
    required: true,
    trim: true
  }
  // Agrega más campos según sea necesario
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
