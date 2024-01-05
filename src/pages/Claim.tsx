import React from "react";
import { RiArrowRightLine } from "react-icons/ri";

import { ParMd, ParXl, SingleColumnLayout } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";
import { styled } from "styled-components";
import { ClaimList } from "../components/ClaimList";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { useClaimShaman } from "../hooks/useClaimShaman";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { ButtonRouterLink } from "../components/ButtonRouterLink";

const ContentContainer = styled.div`
  text-align: left;
  width: 100%;
`;

export const Claim = ({ dao }: { dao: MolochV3Dao }) => {
  const { address } = useDHConnect();
  const { daoChain, daoId } = useCurrentDao();
  const { sdata } = useClaimShaman({
    dao,
    chainId: daoChain,
  });

  return (
    <SingleColumnLayout
      title="Activate Your Avatar"
      actions={
        // <ButtonRouterLink
        //   to={`/molochV3/${daoChain}/${daoId}`}
        //   IconRight={RiArrowRightLine}
        // >
        //   Go to DAO
        // </ButtonRouterLink>
        <ButtonRouterLink
          color="secondary"
          to={`/molochV3/${daoChain}/${dao.id}/member/${address}`}
          IconRight={RiArrowRightLine}
          disabled={!address}
        >
          My Profile
        </ButtonRouterLink>
      }
    >
      
      {!address && (
        <ContentContainer>
          <ParXl>SiloHaus RDF governance drop tool</ParXl>
          <ParMd>Connect your wallet to see your available avatars.</ParMd>
        </ContentContainer>
      )}
      {address && daoChain && sdata?.nft.result && (
        <ContentContainer>
          <ClaimList
            address={address}
            daoChain={daoChain}
            nftAddress={sdata.nft.result}
          />
        </ContentContainer>
      )}
    </SingleColumnLayout>
  );
};
