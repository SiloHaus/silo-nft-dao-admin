import styled from "styled-components";

import { ValidNetwork } from "@daohaus/keychain-utils";

import { useAccountNfts } from "../hooks/useAccountNfts";
import { Loading, ParMd, breakpoints } from "@daohaus/ui";
import { NftCard } from "./NftCard";
import { useDaoData } from "@daohaus/moloch-v3-hooks";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 4rem;
  row-gap: 2rem;
  justify-content: center;
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

  if (!dao || !dao.shamen || !dao.shamen.length) return <Loading />;

  const { accountNfts, isLoading } = useAccountNfts({
    accountAddress: address,
    contractAddress: nftAddress,
    chainId: daoChain,
  });

  if (isLoading) return <Loading />;

  if (!isLoading && accountNfts?.length === 0) {
    return <ParMd>No NFTs detected.</ParMd>;
  }

  return (
    <ListContainer>
      {accountNfts &&
        accountNfts.map((nft) => {
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
  );
};
