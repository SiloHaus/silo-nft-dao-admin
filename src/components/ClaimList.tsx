import styled from "styled-components";

import { ValidNetwork } from "@daohaus/keychain-utils";

import { useAccountNfts } from "../hooks/useAccountNfts";
import { Loading, ParLg, ParMd, breakpoints } from "@daohaus/ui";
import { NftCard } from "./NftCard";
import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { useClaimShaman } from "../hooks/useClaimShaman";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 4rem;
  row-gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 3rem;

  @media (min-width: ${breakpoints.xs}) {
    justify-content: flex-start;
  }
`;

export const ClaimList = ({
  address,
  daoChain,
  nftAddress,
}: {
  address: string;
  daoChain: ValidNetwork;
  nftAddress: string;
}) => {
  const { dao } = useDaoData();
  const { shamanAddress } = useClaimShaman({ dao, chainId: daoChain });

  if (!dao || !dao.shamen || !dao.shamen.length) return <Loading />;

  const { accountNfts, isLoading } = useAccountNfts({
    accountAddress: address,
    contractAddress: nftAddress,
    chainId: daoChain,
    shamanAddress: shamanAddress,
  });


  if (isLoading) return <Loading />;

  if (!isLoading && accountNfts?.length === 0) {
    return <ParMd>No NFTs detected.</ParMd>;
  }

  return (
    <>
      <ParLg>Unclaimed</ParLg>
      <ListContainer>
        {accountNfts &&
          accountNfts
            .filter((nft) => !nft.isClaimed)
            .map((nft) => {
              return (
                <NftCard
                  nft={nft}
                  key={nft.tokenID}
                  isClaim={true}
                  isHolder={true}
                />
              );
            })}
      </ListContainer>

      <ParLg>Claimed</ParLg>
      <ListContainer>
        {accountNfts &&
          accountNfts
            .filter((nft) => nft.isClaimed)
            .map((nft) => {
              return (
                <NftCard
                  nft={nft}
                  key={nft.tokenID}
                  isClaim={true}
                  isHolder={true}
                />
              );
            })}
      </ListContainer>
    </>
  );
};
