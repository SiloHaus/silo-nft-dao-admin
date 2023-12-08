import { styled } from "styled-components";
import { TokenBalance } from "@0xsequence/indexer";

import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { Loading, ParSm } from "@daohaus/ui";
import { EthAddress, fromWei } from "@daohaus/utils";

import { ClaimButton } from "./ClaimButton";
import { useClaimStatus } from "../hooks/useNftClaimStatus";
import { useClaimShaman } from "../hooks/useClaimShaman";

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

  const { sdata, isLoading: isShamanLoading } = useClaimShaman({
    dao,
    chainId: daoChain,
  });

  if (isLoading || isShamanLoading) return <Loading />;

  return (
    <>
      <ClaimPar>
        Claimable {dao?.lootTokenSymbol}:{" "}
        {fromWei(sdata?.lootPerNft?.result || "0")}
      </ClaimPar>

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
