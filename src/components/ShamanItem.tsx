import { AddressDisplay, DataSm, Tag, Tooltip, widthQuery } from "@daohaus/ui";
import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { ButtonRouterLink } from "./ButtonRouterLink";

import { ShamanListContainer } from "./ShamanList";
import { useClaimShaman } from "../hooks/useClaimShaman";
import { styled } from "styled-components";

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

export const ShamanTag = styled(Tag)``;

export const ShamanItem = ({
  shaman,
  daoChain,
  daoId,
  includeLinks,
}: ShamanItemProps) => {
  // use claim shaman
  const { shamanName, sdata } = useClaimShaman({
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
        {shamanName ? (
          <ShamanTag tagColor="green">
            <>
              {shamanName as string}
              <Tooltip content={`maybe some info`} />
            </>
          </ShamanTag>
        ) : (
          <ShamanTag tagColor="green">
            <>
              Unknown
              <Tooltip content={`not sure but cool`} />
            </>
          </ShamanTag>
        )}
      </span>
      <div className="manage">
        <DataSm>{shaman.permissions}</DataSm>

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
