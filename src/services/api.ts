import axios from 'axios';
import { Movie, Planet, Starship, Character } from '../types';

// Elimina la siguiente línea porque 'API_URL' no se utiliza
// const API_URL = 'https://swapi.dev/api';

export const fetchMovies = () => axios.get<{ results: Movie[] }>('https://swapi.dev/api/films/');
export const fetchPlanets = () => axios.get<{ results: Planet[] }>('https://swapi.dev/api/planets/');
export const fetchStarships = () => axios.get<{ results: Starship[] }>('https://swapi.dev/api/starships/');
export const fetchCharacters = () => axios.get<{ results: Character[] }>('https://swapi.dev/api/people/');
