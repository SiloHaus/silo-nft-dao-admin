import React from "react";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { SingleColumnLayout } from "@daohaus/ui";
import { MetadataSettings, ShamanSettings } from "@daohaus/moloch-v3-macro-ui";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { ContractSettings } from "../components/ContractSettings";
import { GovernanceSettings } from "../components/GovernanceSettings";

export const Settings = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  return (
    <SingleColumnLayout title="Settings">
      {dao && (
        <>
          <MetadataSettings
            dao={dao}
            daoChain={daoChain as ValidNetwork}
            includeLinks={true}
          />

          <ContractSettings dao={dao} daoChain={daoChain as ValidNetwork} />

          <GovernanceSettings
            dao={dao}
            daoChain={daoChain as ValidNetwork}
            includeLinks={true}
          />
          <ShamanSettings
            dao={dao}
            daoChain={daoChain as ValidNetwork}
            includeLinks={true}
          />
        </>
      )}
    </SingleColumnLayout>
  );
};
