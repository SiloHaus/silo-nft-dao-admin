import { styled } from "styled-components";

import { EthAddress } from "@daohaus/utils";
import { useCurrentDao, useProfile } from "@daohaus/moloch-v3-hooks";
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
import { useTba } from "../hooks/useTba";
import { ButtonRouterLink } from "./ButtonRouterLink";
import { RiArrowRightLine } from "react-icons/ri";
import { MolochV3Member } from "@daohaus/moloch-v3-data";
import { RiSkull2Fill } from "react-icons/ri";


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

const AliveSection = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: #ff0000;
`;

const NftImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const NftCardImageOverlay = styled.div`
  display: flex;
  position: absolute;
  cursor: pointer;
  top: 4rem;
  left: 0;
  font-size: 4rem;
  color: ${({ theme }) => theme.primary.step5};
  border-radius: ${({ theme }) => theme.card.radius};
  opacity: 0.7;
`;

const Skull2FillOutline = styled(RiSkull2Fill)`
stroke-width: 1.2px !important;
stroke: ${({ theme }) => theme.primary.step1};
`;

export const TbaProfile = ({ tbaAddress, membership }: { 
  tbaAddress: string;
  membership: MolochV3Member;
}) => {
  const { daoChain, daoId } = useCurrentDao();
  const { nft } = useTbaNft({
    tbaAddress: tbaAddress as EthAddress,
    chainId: daoChain,
  });
  const { profile: currentProfile, isLoading: isLoadingProfile } = useProfile({
    address: tbaAddress,
  });
  const { address, disconnect } = useDHConnect();

  if (!nft) return null;

  return (
    <TbaCard>
      <NftImageWrapper>
        <NftCardImage src={nft.metadata?.image} />
        {Number(membership?.shares) == 0 && (<NftCardImageOverlay>
            <Skull2FillOutline  />
          </NftCardImageOverlay>)}
      </NftImageWrapper>
      <div>
        <H6>NPC</H6>
        <ParMd>{nft.metadata?.name}</ParMd>
        <ParXs>Token #{nft.metadata?.tokenId}</ParXs>
        <ParXs>{nft.metadata?.description}</ParXs>

        <AliveSection>
        <ParXs>{Number(membership?.shares) == 0 && "Dead" || "Alive"}</ParXs>
        </AliveSection>

        <ContractSection>
          <ParSm>NFT Contract</ParSm>
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
          {nft?.owner ? (<><ParSm>Player Profile</ParSm>
          <AddressDisplay
            address={nft?.owner as `0x${string}`}
            copy
            truncate
            explorerNetworkId={daoChain as keyof Keychain}
          /> 
          <ButtonRouterLink
          color="secondary"
          to={`/molochV3/${daoChain}/${daoId}/member/${nft.owner}`}
          IconRight={RiArrowRightLine}
          disabled={!address}
        >
          Player Profile
        </ButtonRouterLink>
        </>): null}
        </ContractSection>
        
        {address === tbaAddress && (<Button color="secondary" size="sm" fullWidth onClick={disconnect}>)
          Disconnect
        </Button>)}
      </div>
    </TbaCard>
  );
};
