import { TokenBalance } from "@0xsequence/indexer";
import styled from "styled-components";

import { AddressDisplay, Card, ParSm, ParXs } from "@daohaus/ui";
import { useDaoData } from "@daohaus/moloch-v3-hooks";
import { ClaimButton } from "./ClaimButton";
import { ConnectTBAButton } from "./ConnectTBAButton";
import { DelegateButton } from "./DelegateButton";

const CardContainer = styled(Card)`
  padding: 0;
  padding-top: 1rem;
  //todo: how to width on various nft image sizes
  // how to position the image?
  width: 17rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardLower = styled.div`
  padding: 1rem;
  word-wrap: wrap;
`;

const NftCardImage = styled.img`
  width: 120px;
  //todo: how to width on various nft image sizes
  min-height: 18.3rem;
  border-radius: ${({ theme }) => theme.card.radius};
`;

const NamePar = styled(ParSm)`
  font-weight: 600;
`;

const LowerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ClaimPar = styled(ParSm)`
  font-weight: 600;
  color: ${({ theme }) => theme.secondary.step9};
`;

type NftCardProps = {
  nft: TokenBalance;
  isClaim?: boolean;
  //todo - just use hooks here to check this?
  isHolder?: boolean;
};

// TODO: need the TBA address here

export const NftCard = ({ nft, isClaim, isHolder }: NftCardProps) => {
  const { dao } = useDaoData();

  return (
    <CardContainer>
      <NftCardImage src={nft.tokenMetadata?.image} />
      <CardLower>
        <NamePar>{`${nft.contractInfo?.name} #${nft.tokenID}`}</NamePar>
        {isClaim && (
          <LowerSection>
            <ClaimPar>{dao?.lootTokenName}: 69,420</ClaimPar>
            <ClaimButton tokenId={nft.tokenID} />
          </LowerSection>
        )}

        {!isClaim && (
          <LowerSection>
            <AddressDisplay address={nft.contractAddress} truncate copy />
            <ConnectTBAButton
              tokenId={nft.tokenID}
              contractAddress={nft.contractAddress}
            />
            <DelegateButton />
          </LowerSection>
        )}
      </CardLower>
    </CardContainer>
  );
};
