import { styled } from "styled-components";
import { TokenBalance } from "@0xsequence/indexer";

import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { Loading, ParSm } from "@daohaus/ui";
import { ClaimButton } from "./ClaimButton";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { EthAddress } from "@daohaus/utils";
import { useClaimStatus } from "../hooks/useNftClaimStatus";

const ClaimPar = styled(ParSm)`
  font-weight: 600;
  color: ${({ theme }) => theme.secondary.step9};
`;

type NftCardClaimSectionProps = {
  nft: TokenBalance;
  dao: MolochV3Dao;
  shamanAddress?: EthAddress;
};
export const NftCardClaimSection = ({
  nft,
  dao,
  shamanAddress,
}: NftCardClaimSectionProps) => {
  const { daoChain } = useCurrentDao();

  const { isClaimed, isLoading } = useClaimStatus({
    shamanAddress,
    tokenId: nft.tokenID,
    chainId: daoChain,
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <ClaimPar>{dao?.lootTokenName}: 69,420</ClaimPar>

      {shamanAddress && (
        <ClaimButton
          tokenId={nft.tokenID}
          shamanAddress={shamanAddress}
          isClaimed={isClaimed}
        />
      )}
    </>
  );
};
