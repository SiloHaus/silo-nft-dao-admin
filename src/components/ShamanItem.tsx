import { AddressDisplay, DataSm, widthQuery } from "@daohaus/ui";
import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { ButtonRouterLink } from "./ButtonRouterLink";
import { styled } from "styled-components";
import { ShamanListContainer } from "./ShamanList";
import { useClaimShaman } from "../hooks/useClaimShaman";
import { formatValueTo } from "@daohaus/utils";
import { formatEther } from 'viem'

type ShamanItemProps = {
  shaman: {
    id: string;
    createdAt: string;
    shamanAddress: string;
    permissions: string;
  };
  daoChain: ValidNetwork;
  daoId: string;
  includeLinks?: boolean;
};

export const ShamanItem = ({
  shaman,
  daoChain,
  daoId,
  includeLinks,
}: ShamanItemProps) => {
    // use claim shaman
    const {  nftAddress, lootPerNft, sharesPerNft, paused, vaultAddress } = useClaimShaman({
        contractAddress: shaman.shamanAddress as `0x${string}`,
        chainId: daoChain,
        });
  return (
    <ShamanListContainer key={shaman.id}>
      <span className="contract">
        <AddressDisplay
          address={shaman.shamanAddress}
          explorerNetworkId={daoChain as keyof Keychain}
          truncate
        />
      </span>
      <div className="manage">
        <DataSm>{shaman.permissions}</DataSm> 
        <DataSm>{formatEther(BigInt(lootPerNft || "0"))}</DataSm>       

        {includeLinks && (
          <ButtonRouterLink
            size="sm"
            color="secondary"
            to={`/molochv3/${daoChain}/${daoId}/new-proposal?formLego=UPDATE_SHAMAN&defaultValues=${JSON.stringify(
              {
                shamanAddress: shaman.shamanAddress,
                shamanPermission: shaman.permissions,
              }
            )}`}
          >
            Manage
          </ButtonRouterLink>
        )}
      </div>
    </ShamanListContainer>
  );
};
