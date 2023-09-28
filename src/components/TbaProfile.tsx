import { styled } from "styled-components";

import { EthAddress } from "@daohaus/utils";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { useTbaNft } from "../hooks/useTbaNft";
import {
  AddressDisplay,
  Button,
  Card,
  H6,
  ParMd,
  ParSm,
  ParXs,
  widthQuery,
} from "@daohaus/ui";
import { Keychain } from "@daohaus/keychain-utils";
import { useDHConnect } from "@daohaus/connect";

const NftCardImage = styled.img`
  max-width: 25rem;
  min-height: 25rem;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.card.radius};
  object-fit: cover;
`;

const TbaCard = styled(Card)`
  width: 64rem;
  margin-bottom: 2rem;
  border: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;

  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

const ContractSection = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const TbaProfile = ({ tbaAddress }: { tbaAddress: string }) => {
  const { daoChain } = useCurrentDao();
  const { nft } = useTbaNft({
    tbaAddress: tbaAddress as EthAddress,
    chainId: daoChain,
  });
  const { disconnect } = useDHConnect();

  console.log("nft", nft);
  if (!nft) return null;

  return (
    <TbaCard>
      <div>
        <NftCardImage src={nft.metadata?.image} />
      </div>
      <div>
        <H6>Connected NFT</H6>
        <ParMd>{nft.metadata?.name}</ParMd>
        <ParXs>Token #{nft.metadata?.tokenId}</ParXs>
        <ParXs>{nft.metadata?.description}</ParXs>
        <ContractSection>
          <ParSm>NFT</ParSm>
          <AddressDisplay
            address={nft?.tbaData.tokenContract}
            copy
            truncate
            explorerNetworkId={daoChain as keyof Keychain}
          />
          <ParSm>TBA</ParSm>
          <AddressDisplay
            address={tbaAddress}
            copy
            truncate
            explorerNetworkId={daoChain as keyof Keychain}
          />
        </ContractSection>
        <Button color="secondary" size="sm" fullWidth onClick={disconnect}>
          Disconnect
        </Button>
      </div>
    </TbaCard>
  );
};
