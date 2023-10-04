import styled from "styled-components";

import { ValidNetwork } from "@daohaus/keychain-utils";

import { useAccountNfts } from "../hooks/useAccountNfts";
import { Loading, breakpoints, widthQuery } from "@daohaus/ui";
import { NftCard } from "./NftCard";
import { useClaimShaman } from "../hooks/useClaimShaman";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  column-gap: 4rem;
  row-gap: 2rem;
  justify-content: center;
  @media (min-width: ${breakpoints.xs}) {
    justify-content: flex-start;
  }
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const ProfileNftList = ({
  address,
  daoChain,
  dao,
  isHolder,
}: {
  address: string;
  daoChain: ValidNetwork;
  dao: MolochV3Dao;
  isHolder?: boolean;
}) => {
  const { sdata } = useClaimShaman({
    dao,
    chainId: daoChain,
  });

  const { accountNfts, isLoading } = useAccountNfts({
    accountAddress: address,
    contractAddress: sdata?.nft.result,
    chainId: daoChain,
  });

  if (isLoading) return <Loading />;

  return (
    <ListContainer>
      {accountNfts &&
        accountNfts.map((nft) => {
          return <NftCard nft={nft} key={nft.tokenID} isHolder={isHolder} />;
        })}
    </ListContainer>
  );
};
