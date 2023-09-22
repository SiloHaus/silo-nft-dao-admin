import { TokenBalance } from "@0xsequence/indexer";
import styled from "styled-components";

import { AddressDisplay, Button, Card, ParSm } from "@daohaus/ui";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { ClaimButton } from "./ClaimButton";
import { ConnectTBAButton } from "./ConnectTBAButton";
import { DelegateButton } from "./DelegateButton";
import { useTba } from "../hooks/useTba";
import { EthAddress } from "@daohaus/utils";
import { DelegateToOwnerButton } from "./DelegateToOwnerButton";

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

export const NftCard = ({ nft, isClaim, isHolder }: NftCardProps) => {
  const { dao } = useDaoData();
  const { daoChain } = useCurrentDao();
  const { tba } = useTba({
    contractAddress: nft.contractAddress as EthAddress,
    tokenId: nft.tokenID,
    chainId: daoChain,
  });

  return (
    <CardContainer>
      <NftCardImage src={nft.tokenMetadata?.image} />
      <CardLower>
        <NamePar>{`${nft.contractInfo?.name} #${nft.tokenID}`}</NamePar>
        {isClaim && (
          <LowerSection>
            <ClaimPar>{dao?.lootTokenName}: 69,420</ClaimPar>
            <ClaimButton
              tokenId={nft.tokenID}
              contractAddress={nft.contractAddress}
            />
          </LowerSection>
        )}

        {!isClaim && (
          <LowerSection>
            {tba && <AddressDisplay address={tba} truncate copy />}
            <ConnectTBAButton
              tokenId={nft.tokenID}
              contractAddress={nft.contractAddress}
            />
            {!isHolder && (
              <DelegateToOwnerButton
                tokenId={nft.tokenID}
                contractAddress={nft.contractAddress}
              />
            )}
          </LowerSection>
        )}
      </CardLower>
    </CardContainer>
  );
};
