import { styled } from "styled-components";

import {
  H3,
  AddressDisplay,
  ParSm,
  useBreakpoint,
  widthQuery,
} from "@daohaus/ui";
import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { SettingsContainer } from "./layout/GeneralLayouts";

export const MetaCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

export const MetaContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 3.4rem;
`;

type ContractSettingsProps = {
  dao: MolochV3Dao;
  daoChain: ValidNetwork;
};

export const ContractSettings = ({ dao, daoChain }: ContractSettingsProps) => {
  const isMobile = useBreakpoint(widthQuery.sm);

  return (
    <SettingsContainer>
      <MetaCardHeader>
        <H3>Contracts</H3>
      </MetaCardHeader>
      <MetaContent>
        <div>
          <ParSm>Moloch v3</ParSm>
          <AddressDisplay
            address={dao.id}
            copy
            explorerNetworkId={daoChain as keyof Keychain}
            truncate={isMobile}
          />
        </div>
        <div>
          <ParSm>Gnosis Safe (Treasury)</ParSm>
          <AddressDisplay
            address={dao.safeAddress}
            copy
            truncate={isMobile}
            explorerNetworkId={daoChain as keyof Keychain}
          />
        </div>
        <div>
          <ParSm>Voting Token</ParSm>
          <AddressDisplay
            address={dao.sharesAddress}
            copy
            truncate={isMobile}
            explorerNetworkId={daoChain as keyof Keychain}
          />
        </div>
        <div>
          <ParSm>Meme Token</ParSm>
          <AddressDisplay
            address={dao.lootAddress}
            copy
            truncate={isMobile}
            explorerNetworkId={daoChain as keyof Keychain}
          />
        </div>
      </MetaContent>
    </SettingsContainer>
  );
};
