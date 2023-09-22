import React from "react";

import { ParMd, ParXl, SingleColumnLayout } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";
import { styled } from "styled-components";
import { ClaimList } from "../components/ClaimList";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { useClaimShaman } from "../hooks/useClaimShaman";

const ContentContainer = styled.div`
  text-align: left;
  width: 100%;
`;

export const Claim = () => {
  const { address } = useDHConnect();
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();
  const { sdata } = useClaimShaman({
    contractAddress: dao?.shamen
      ? (dao.shamen[0].shamanAddress as `0x${string}`)
      : undefined,
    chainId: daoChain,
  });

  return (
    <SingleColumnLayout title="Claim your airdrop">
      {!address && (
        <ContentContainer>
          <ParXl>SiloHaus RDF airdrop tool</ParXl>
          <ParMd>Connect your wallet to see your available claims.</ParMd>
        </ContentContainer>
      )}
      {address && daoChain && sdata?.nft.result && (
        <ClaimList
          address={address}
          daoChain={daoChain}
          nftAddress={sdata.nft.result}
        />
      )}
    </SingleColumnLayout>
  );
};
