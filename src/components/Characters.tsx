import React, { useEffect, useState } from 'react';
import { fetchCharacters } from '../services/api';
import { List, Modal, Button, Image } from 'antd'; // Importa Image de antd
import { Character } from '../types';


const characterCoverUrls: CharacterCoverUrls = {
 'Luke Skywalker': 'https://th.bing.com/th/id/R.5082440bf8e9096390c4d4a02298b36b?rik=El%2bFLRg%2bnt77tw&riu=http%3a%2f%2f3.bp.blogspot.com%2f_wrWQciYjEFU%2fTLGRKKbz-aI%2fAAAAAAAAAEQ%2f3kxzNSS9gXQ%2fs1600%2fLukeSkywalker.jpg&ehk=IdGu1BCliJxbAauA%2frehjkJswy77yrzO1FxZJ2W7BiM%3d&risl=&pid=ImgRaw&r=0',
  'C-3PO': 'https://th.bing.com/th/id/OIP.A-8FsoHxHC0C4TzUH5F5sAHaFj?rs=1&pid=ImgDetMain',
  'R2-D2': 'https://th.bing.com/th/id/OIP.1rzXbe9eIfif_6xlsCAkHgHaDt?rs=1&pid=ImgDetMain',
  'Darth Vader': 'https://images2.alphacoders.com/591/thumb-1920-59190.jpg',
  'Leia Organa':'https://th.bing.com/th/id/R.e7970e7a8c758de735abbf302280e75c?rik=krndnqEalP7Sxw&riu=http%3a%2f%2fimages2.fanpop.com%2fimages%2fphotos%2f8400000%2fleia-princess-leia-organa-solo-skywalker-8412455-1024-768.jpg&ehk=P5y%2fwB12Hu44Q0EOcnlctUDRgfnVdrmT1EEFPisBsA0%3d&risl=&pid=ImgRaw&r=0',
  'Owen Lars': 'https://disneynews.us/wp-content/uploads/2021/04/Owen-Lars-star-wars.jpg',
  'Beru Whitesun lars':'https://assets.mycast.io/characters/beru-whitesun-lars-7354748-normal.jpg?1657283061',
  'R5-D4':'https://cdnb.artstation.com/p/assets/images/images/001/727/465/large/paul-beards-r5-d4-final-preview-01.jpg?1451853235',
  'Biggs Darklighter':'https://th.bing.com/th/id/R.75328c5f23199b79662784c4ad72a09b?rik=xYsjL66%2bvuOSEA&riu=http%3a%2f%2fimg2.wikia.nocookie.net%2f__cb20130305010406%2fstarwars%2fimages%2f0%2f00%2fBiggsHS-ANH.png&ehk=k5vXPduLLl46%2bHcAtOdVqw%2bgbmvB%2bNDPtzEFMGojdy0%3d&risl=&pid=ImgRaw&r=0',
  'Obi-Wan Kenobi':'https://www.liveabout.com/thmb/F5lfgFptU9DNTDCT-xNEtot0lQ0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EP2-IA-60435_R_8x10-56a83bea3df78cf7729d314a.jpg'
};
type CharacterCoverUrls = {
    [key: string]: string; // Esta es la firma de índice que indica que cualquier clave de tipo string devolverá un string
  };
const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    fetchCharacters().then(response => {
      setCharacters(response.data.results);
    });
  }, []);

  const showModal = (character: Character) => {
    setSelectedCharacter(character);
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
        dataSource={characters}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Image src={characterCoverUrls[item.name]} width={100} alt={item.name} />}
              title={<Button type="link" onClick={() => showModal(item)}>{item.name}</Button>}
              // Agrega más descripciones si es necesario
            />
          </List.Item>
        )}
      />
      {selectedCharacter && (
        <Modal
          title={selectedCharacter.name}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Image
            width={200}
            src={characterCoverUrls[selectedCharacter.name]}
            alt={`Imagen de ${selectedCharacter.name}`}
          />
          {/* Aquí puedes incluir más información del personaje seleccionado */}
          <p>{`Género: ${selectedCharacter.gender}`}</p>
          <p>{`Nacimiento: ${selectedCharacter.birth_year}`}</p>
          {/* Agrega más detalles que desees mostrar */}
        </Modal>
      )}
    </>
  );
};

export default Characters;
