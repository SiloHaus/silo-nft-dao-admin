import styled from "styled-components";

import { ValidNetwork } from "@daohaus/keychain-utils";

import { useAccountNfts } from "../hooks/useAccountNfts";
import { Loading, breakpoints, widthQuery } from "@daohaus/ui";
import { NftCard } from "./NftCard";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 4rem;
  row-gap: 2rem;
  justify-content: center;
  width: 100rem;
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
  nftAddress,
  isHolder,
}: {
  address: string;
  daoChain: ValidNetwork;
  nftAddress: string;
  isHolder?: boolean;
}) => {
  const { accountNfts, isLoading } = useAccountNfts({
    accountAddress: address,
    contractAddress: nftAddress,
    chainId: daoChain,
  });

  console.log("accountNfts", accountNfts);

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
