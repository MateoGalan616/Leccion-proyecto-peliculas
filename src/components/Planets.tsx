import React, { useEffect, useState } from 'react';
import { fetchPlanets } from '../services/api';
import { List, Modal, Button, Image } from 'antd';
import { Planet } from '../types';

type PlanetCoverUrls = {
  [key: string]: string | undefined;
};

// Suponiendo que tienes un objeto que mapea los nombres de los planetas a sus URLs de imágenes
const planetCoverUrls: PlanetCoverUrls = {
 'Tatooine': 'https://cdna.artstation.com/p/assets/images/images/026/343/046/large/elie-berthoumieu-elie-berthoumieu-elie-berthoumieu-tatooine-2.jpg?1588528359',
  'Alderaan': 'https://lumiere-a.akamaihd.net/v1/images/databank_alderaan_01_169_4a5264e2.jpeg?region=0%2C0%2C1560%2C780',
  'Yavin IV': 'https://th.bing.com/th/id/OIP.7Vgh12ufmE0Vh2kT1x6MqQHaDa?rs=1&pid=ImgDetMain',
  'Hoth': 'https://th.bing.com/th/id/R.b952bde4fa4d549e2de5de4cb3ba69cc?rik=jI6IaFF9ilu9Ng&pid=ImgRaw&r=0',
  'Dagobah': 'https://th.bing.com/th/id/OIP.kfOpwzH_fTML61Sqm1tjEwHaDt?rs=1&pid=ImgDetMain',
  'Bespin': 'https://lumiere-a.akamaihd.net/v1/images/Dagobah_890df592.jpeg?region=0%2C80%2C1260%2C630',
  'Endor': 'https://wallpaperaccess.com/full/6091675.jpg',
  'Naboo': 'https://wallpaperaccess.com/full/5955752.jpg',
  'Coruscant':'https://th.bing.com/th/id/R.4661889f197f0b732c682838b07cc16f?rik=F%2bOAZ2Z%2bs%2byHFg&riu=http%3a%2f%2fimg3.wikia.nocookie.net%2f__cb20140814133059%2fstar-wars-reckoning%2fimages%2ff%2ffe%2fSW_Coruscant.jpg&ehk=0CFWiwLqSi8t0%2fTQ15ZhCotQAO6RDEP8jKj%2fegkYLoA%3d&risl=&pid=ImgRaw&r=0',
  'Kamino': 'https://inreview52838412.files.wordpress.com/2021/08/kaminobadbatch.jpg?w=1650&h=825&crop=1',
};

const Planets: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  useEffect(() => {
    fetchPlanets().then(response => {
      setPlanets(response.data.results);
    });
  }, []);

  const showModal = (planet: Planet) => {
    setSelectedPlanet(planet);
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
        dataSource={planets}
        renderItem={planet => (
          <List.Item>
            <List.Item.Meta
              avatar={<Image src={planetCoverUrls[planet.name]} width={100} alt={planet.name} />}
              title={<Button type="link" onClick={() => showModal(planet)}>{planet.name}</Button>}
              description={`Climate: ${planet.climate}, Population: ${planet.population}`}
            />
          </List.Item>
        )}
      />
      {selectedPlanet && (
        <Modal
          title={selectedPlanet.name}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Image
            width={200}
            src={planetCoverUrls[selectedPlanet.name]}
            alt={`Imagen de ${selectedPlanet.name}`}
          />
          <p>Climate: {selectedPlanet.climate}</p>
          <p>Population: {selectedPlanet.population}</p>
          <p>Terrain: {selectedPlanet.terrain}</p>
          {/* Agrega más detalles que desees mostrar */}
        </Modal>
      )}
    </>
  );
};

export default Planets;
