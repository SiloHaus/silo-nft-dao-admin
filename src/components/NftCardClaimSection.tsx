import { styled } from "styled-components";
import { TokenBalance } from "@0xsequence/indexer";

import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { ParSm } from "@daohaus/ui";
import { ClaimButton } from "./ClaimButton";
import { useClaimShaman } from "../hooks/useClaimShaman";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { EthAddress } from "@daohaus/utils";

const ClaimPar = styled(ParSm)`
  font-weight: 600;
  color: ${({ theme }) => theme.secondary.step9};
`;

type NftCardClaimSectionProps = {
  nft: TokenBalance;
  dao: MolochV3Dao;
  claimShamanAddress?: EthAddress;
};
export const NftCardClaimSection = ({
  nft,
  dao,
  claimShamanAddress,
}: NftCardClaimSectionProps) => {
  const { daoChain } = useCurrentDao();

  console.log("claimShamanAddress", claimShamanAddress);
  // need a useClaimedStatus

  return (
    <>
      <ClaimPar>{dao?.lootTokenName}: 69,420</ClaimPar>
      <ClaimButton
        tokenId={nft.tokenID}
        contractAddress={nft.contractAddress}
      />
    </>
  );
};
