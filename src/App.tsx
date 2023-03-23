import React from 'react';
import Topbar from './components/Topbar';
import { Background } from './components/Background';
import Content from './components/Content';

const App: React.FC = () => {

  return (
    <>
      <div className="main">
        <Background />
        <Topbar />
        <Content />
      </div>
    </>
  );
}

export default App;
