import React from 'react';
import {useRoutes} from 'react-router-dom';
import {Container} from 'components/GlobalComponents';
import routes from 'routes';

const App = () => {
  const routing = useRoutes(routes());

  return (
    <Container>      
      {routing}
    </Container>
  );
};

export default App;
