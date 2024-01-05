import { DHConnectProvider } from '@daohaus/connect';
import { useState } from 'react';
import { Routes } from './Routes';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
background-image: url("https://scarlet-fluffy-lynx-663.mypinata.cloud/ipfs/QmSnuGc5gcBVzkcGLu7HWwmmUvhxY6XhmsqDu9U5KDBLYt/6.png");
background-repeat: no-repeat;
background-size: cover;
background-position: center;


`;

export const App = () => {
  const [daoChainId, setDaoChainId] = useState<string | undefined>();

  return (
    <BackgroundContainer>
    
    <DHConnectProvider daoChainId={daoChainId}>
      <Routes setDaoChainId={setDaoChainId} />
    </DHConnectProvider>
    </BackgroundContainer>

  );
};
