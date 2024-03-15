import { TokenBalance } from "@0xsequence/indexer";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

import {
  AddressDisplay,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTrigger,
  ParSm,
} from "@daohaus/ui";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { EthAddress, ZERO_ADDRESS } from "@daohaus/utils";

import { useTba } from "../hooks/useTba";
import { NftCardClaimSection } from "./NftCardClaimSection";
import { useClaimShaman } from "../hooks/useClaimShaman";
import { useClaimStatus } from "../hooks/useNftClaimStatus";
import { DelegateTBA } from "./DelegateTBA";
import { useState } from "react";
import { NftImageDetails } from "./NftImageDetails";

import { MdOutlineOpenInNew } from "react-icons/md";
import { RageQuitTBA } from "./RageQuitTBA";

const ClaimLink = styled(RouterLink)`
  text-decoration: none;
  font-weight: 600;
`;
const CardContainer = styled(Card)`
  padding: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 30rem;

  display: flex;
  flex-direction: column;
  align-items: left;
`;

const CardLower = styled.div`
  padding: 1rem;
  word-wrap: wrap;
`;

const NftCardImage = styled.img`
  max-width: 25rem;
  min-height: 25rem;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.card.radius};
  object-fit: cover;
  cursor: pointer;
`;

const NftCardImageOverlay = styled.div`
  display: flex;
  position: absolute;
  cursor: pointer;
  top: 0;
  right: 0;
  font-size: 4rem;
  color: ${({ theme }) => theme.secondary.step9};
  border-radius: ${({ theme }) => theme.card.radius};
  opacity: 0.7;
`;

const NftCardImageWrapper = styled.div`
  position: relative;
  width: 25rem;
  height: 25rem;
  margin: 0 auto;
`;

const NamePar = styled(ParSm)`
  font-weight: 600;
`;

const LowerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActionButton = styled.div`
  display: flex;
  flex-direction: row;
  
  gap: 1rem;

  // button {
  //   flex: 1;
  // }
`;

type NftCardProps = {
  nft: TokenBalance;
  isClaim?: boolean;
  //todo - just use hooks here to check this?
  isHolder?: boolean;
};

export const NftCard = ({ nft, isClaim, isHolder }: NftCardProps) => {
  const { dao } = useDaoData();
  const { daoChain } = useCurrentDao();
  const { tba } = useTba({
    contractAddress: nft.contractAddress as EthAddress,
    tokenId: nft.tokenID,
    chainId: daoChain,
  });
  const { shamanAddress } = useClaimShaman({
    dao,
    chainId: daoChain,
  });
  const { isClaimed, isLoading: isClaimLoading } = useClaimStatus({
    shamanAddress: shamanAddress as `0x${string}`,
    tokenId: nft.tokenID,
    chainId: daoChain,
  });
  const [open, setOpen] = useState(false);

  // console.log(">>>>> nft", nft);

  return (
    <CardContainer>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <NftCardImageWrapper>
            <NftCardImage src={nft.tokenMetadata?.image} />
            <NftCardImageOverlay>
              {" "}
              <MdOutlineOpenInNew />{" "}
            </NftCardImageOverlay>
          </NftCardImageWrapper>
        </DialogTrigger>
        <DialogContent title="NPC (Network Playable Character) Details">
          <NftImageDetails
            tokenId={nft.tokenID}
            contractAddress={nft.contractAddress}
            nftImage={nft.tokenMetadata?.image || ""}
            isClaimed={isClaimed || false}
          />
        </DialogContent>
      </Dialog>
      {isHolder && (
        <CardLower>
          <NamePar>{`${nft.contractInfo?.name} #${nft.tokenID}`}</NamePar>
          {isClaim && dao && (
            <LowerSection>
              <NftCardClaimSection
                dao={dao}
                nft={nft}
                shamanAddress={shamanAddress as EthAddress}
              />
            </LowerSection>
          )}

          {!isClaim && isClaimed && (
            <LowerSection>
              {tba && <AddressDisplay address={tba} truncate copy />}
              <ActionButton>
                <DelegateTBA
                  tokenId={nft.tokenID}
                  contractAddress={nft.contractAddress}
                />
                <RageQuitTBA
                  tokenId={nft.tokenID}
                  contractAddress={nft.contractAddress}
                ></RageQuitTBA>
              </ActionButton>
            </LowerSection>
          )}
          {!isClaim && !isClaimed && (
            <LowerSection>
              <ParSm>Not Activated</ParSm>
              <ClaimLink to={`/molochv3/${daoChain}/${dao?.id}/activate`}>
                <Button
                  color="secondary"
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    console.log("Activating");
                  }}
                >
                  Check Avatar
                </Button>
              </ClaimLink>
            </LowerSection>
          )}
        </CardLower>
      )}
    </CardContainer>
  );
};
