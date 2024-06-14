// En tu componente Movies.tsx
import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/api';
import { List, Modal, Button, Image } from 'antd';
import { Movie } from '../types';

type MovieCoverUrls = {
  [key: string]: string | undefined;
};
const movieCoverUrls:MovieCoverUrls = {
  'A New Hope': 'https://picfiles.alphacoders.com/350/350096.jpg',
  'The Empire Strikes Back': 'https://th.bing.com/th/id/R.73bb73264e3c720a7f48b05f45a70ce7?rik=NLBwL6uW7bM9uA&pid=ImgRaw&r=0',
  'Return of the Jedi': 'https://image.tmdb.org/t/p/original/qjAeqea3WN2UZEkIZjSFkdasYyT.jpg',
  'The Phantom Menace': 'https://image.tmdb.org/t/p/original/alNrU6nvf9JnnZ1GJJdjP7ILR1L.jpg',
  'Attack of the Clones': 'https://image.tmdb.org/t/p/original/ovkO07v1IhcZGLr0qgRU70PvG2I.jpg',
  'Revenge of the Sith': 'https://www.themoviedb.org/t/p/original/9R2ztN8KeLZoTUuvSJHURssvLsR.jpg',
};

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetchMovies().then(response => {
      setMovies(response.data.results);
    });
  }, []);

  const showModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={movies}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={<Button type="link" onClick={() => showModal(item)}>{item.title}</Button>}
              description={`Release Date: ${item.release_date}`}
            />
          </List.Item>
        )}
      />
      {selectedMovie && (
        <Modal
          title={selectedMovie.title}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null} // Elimina los botones predeterminados del modal
        >
          <Image
            width={200}
            src={movieCoverUrls[selectedMovie.title]}
            alt={`Cover of ${selectedMovie.title}`}
          />
          {/* Asegúrate de que la API proporcione esta información */}
          <p>{`Director: ${selectedMovie.director}`}</p>
          <p>{`Opening Crawl: ${selectedMovie.opening_crawl}`}</p>
          {/* Agrega más detalles que desees mostrar */}
        </Modal>
      )}
    </>
  );
};

export default Movies;
