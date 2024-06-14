// server.js
const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./models/movie'); // Asegúrate de definir el modelo de Mongoose para 'Movie'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost/starwars', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/movies', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!movie) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
