// App.tsx
import React, { useState } from 'react';
import { Layout } from 'antd';
import SideMenu from './components/Menu';
import Movies from './components/Movies';
import Planets from './components/Planets';
import Starships from './components/Starships';
import Characters from './components/Characters';
import './App.css'; // Asegúrate de importar tu archivo CSS

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('movies');

  const renderContent = () => {
    switch (selectedKey) {
      case 'movies':
        return <Movies />;
      case 'planets':
        return <Planets />;
      case 'starships':
        return <Starships />;
      case 'characters':
        return <Characters />;
      default:
        return <Movies />;
    }
  };

  return (
    <Layout style={{ minHeight: '1000vh' }}>
      <Header className="header">
        <div className="logo" />
        <h1></h1>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <SideMenu onSelect={setSelectedKey} />
        </Sider>
        <Content className="site-layout-background">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
