import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, RocketOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

// Elimina la siguiente línea porque 'SubMenu' no se utiliza
// import { SubMenu } from 'antd';

type Props = {
  onSelect: (key: string) => void;
};

const SideMenu: React.FC<Props> = ({ onSelect }) => {
  return (
    <Menu
      onClick={(e) => onSelect(e.key)}
      style={{ width: 256 }}
      mode="vertical"
    >
      <Menu.Item key="movies" icon={<VideoCameraOutlined />}>Películas</Menu.Item>
      <Menu.Item key="planets" icon={<AppstoreOutlined />}>Planetas</Menu.Item>
      <Menu.Item key="starships" icon={<RocketOutlined />}>Naves</Menu.Item>
      <Menu.Item key="characters" icon={<UserOutlined />}>Personajes</Menu.Item>
    </Menu>
  );
};

export default SideMenu;
