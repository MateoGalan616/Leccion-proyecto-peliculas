import React, { useEffect, useState } from 'react';
import { fetchStarships } from '../services/api'; // Asegúrate de tener esta función en tu API
import { List, Modal, Button, Image } from 'antd';
import { Starship } from '../types'; // Define este tipo según los datos de tu API

type StarshipCoverUrls = {
  [key: string]: string | undefined;
};

// Suponiendo que tienes un objeto que mapea los nombres de las naves a sus URLs de imágenes
const starshipCoverUrls: StarshipCoverUrls = {
'CR90 corvette': 'https://th.bing.com/th/id/R.d8b654a46ae5bf51ea9a4bdcb7e7243c?rik=loJTGuKm4%2byNwg&riu=http%3a%2f%2fvignette2.wikia.nocookie.net%2fstarwars%2fimages%2f4%2f47%2fRebels-TantiveIVConceptArt-CroppedBackground.png%2frevision%2flatest%3fcb%3d20150215073634&ehk=1cgzd%2fs2h4WmfsBzehvMa2cRX%2f68bJLjixGLMfoqMk0%3d&risl=&pid=ImgRaw&r=0',
'Star Destroyer':'https://i.pinimg.com/originals/42/7e/ea/427eeab952c237045842d7d5e22f7e0c.jpg',
'Sentinel-class landing craft':'https://i.pinimg.com/originals/12/d1/f6/12d1f6ce358be6598cd1022390bdae79.jpg',
'Death Star':'https://th.bing.com/th/id/OIP.ErkX2zOHXBYafNmrC2QTrQHaDt?rs=1&pid=ImgDetMain',
'Millennium Falcon':'https://www.wallpaperflare.com/static/517/933/283/star-wars-millennium-falcon-millennium-falcon-wallpaper.jpg',
'Y-wing':'https://th.bing.com/th/id/R.572ec74e67c3681eff7f6500470592ae?rik=5buxnziI%2bcy3kQ&riu=http%3a%2f%2fimg4.wikia.nocookie.net%2f__cb20070210175842%2fstarwars%2fimages%2fc%2fcd%2fYwing.jpg&ehk=roZ0aXOdmkj4xszihfwYnRMTDLTfqziJE9oDzGXCzJI%3d&risl=&pid=ImgRaw&r=0',
'X-wing':'https://th.bing.com/th/id/OIP.eEDR6JwYV6c0-X2fJLQTHwHaFH?rs=1&pid=ImgDetMain',
'TIE Advanced x1':'https://the-gadgeteer.com/wp-content/uploads/2018/01/propel-starwarstieadvancedx1drone-01a.jpg',
'Executor':'https://vignette.wikia.nocookie.net/starwars/images/3/30/Executor_BF2.png/revision/latest?cb=20180903230846',
'Rebel transport': 'https://vignette.wikia.nocookie.net/ru.starwars/images/e/e6/Rebel_transport_box_art.jpg/revision/latest?cb=20150209082940',
};

const Starships: React.FC = () => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStarship, setSelectedStarship] = useState<Starship | null>(null);

  useEffect(() => {
    fetchStarships().then(response => {
      setStarships(response.data.results);
    });
  }, []);

  const showModal = (starship: Starship) => {
    setSelectedStarship(starship);
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
        dataSource={starships}
        renderItem={starship => (
          <List.Item>
            <List.Item.Meta
              avatar={<Image src={starshipCoverUrls[starship.name]} width={100} alt={starship.name} />}
              title={<Button type="link" onClick={() => showModal(starship)}>{starship.name}</Button>}
              description={`Model: ${starship.model}, Passengers: ${starship.passengers}`}
            />
          </List.Item>
        )}
      />
      {selectedStarship && (
        <Modal
          title={selectedStarship.name}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Image
            width={200}
            src={starshipCoverUrls[selectedStarship.name]}
            alt={`Imagen de ${selectedStarship.name}`}
          />
          <p>Model: {selectedStarship.model}</p>
          <p>Passengers: {selectedStarship.passengers}</p>
          <p>Manufacturer: {selectedStarship.manufacturer}</p>
          {/* Agrega más detalles que desees mostrar */}
        </Modal>
      )}
    </>
  );
};

export default Starships;
