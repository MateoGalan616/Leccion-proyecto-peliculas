const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Simulación de base de datos
let movies = [
  { id: 1, title: 'A New Hope', releaseYear: 1977 },
  // ... otros datos de películas
];

// CREATE
app.post('/api/movies', (req, res) => {
  const newMovie = { id: movies.length + 1, ...req.body };
  movies.push(newMovie);
  res.status(201).send(newMovie);
});

// READ
app.get('/api/movies', (req, res) => {
  res.send(movies);
});

// UPDATE
app.put('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found.');

  movie.title = req.body.title;
  movie.releaseYear = req.body.releaseYear;
  res.send(movie);
});

// DELETE
app.delete('/api/movies/:id', (req, res) => {
  movies = movies.filter(m => m.id !== parseInt(req.params.id));
  res.send({ message: 'Movie deleted.' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
