import React from "react";

import { ParMd, ParXl, SingleColumnLayout } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";
import { styled } from "styled-components";

const ContentContainer = styled.div`
  text-align: left;
  width: 100%;
`;

export const Claim = () => {
  const { address } = useDHConnect();

  return (
    <SingleColumnLayout title="Claim your airdrop">
      {!address && (
        <ContentContainer>
          <ParXl>SiloHaus RDF airdrop tool</ParXl>
          <ParMd>Connect your wallet to see your available claims.</ParMd>
        </ContentContainer>
      )}
      {address && <p>connected</p>}
    </SingleColumnLayout>
  );
};
