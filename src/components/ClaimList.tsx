import styled from "styled-components";

import { ValidNetwork } from "@daohaus/keychain-utils";

import { NFT_ADDRESS } from "../utils/constants";
import { useAccountNfts } from "../hooks/useAccountNfts";
import { Loading, breakpoints } from "@daohaus/ui";
import { NftCard } from "./NftCard";

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
}: {
  address: string;
  daoChain: ValidNetwork;
}) => {
  //todo: will come from some shaman hook;
  const nftAddress = NFT_ADDRESS;

  const { accountNfts, isLoading } = useAccountNfts({
    accountAddress: address,
    contractAddress: nftAddress,
    chainId: daoChain,
  });

  if (isLoading) return <Loading />;

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
