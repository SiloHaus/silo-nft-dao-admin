import React from "react";
import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { SingleColumnLayout } from "@daohaus/ui";
import {
  ContractSettings,
  DaoSettings,
  GovernanceSettings,
  MetadataSettings,
  ShamanSettings,
} from "@daohaus/moloch-v3-macro-ui";
import { Keychain } from "@daohaus/keychain-utils";

export const Settings = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  return (
    <SingleColumnLayout title="Settings">
      {dao && daoChain && (
        <>
          <MetadataSettings dao={dao} daoChain={daoChain} includeLinks={true} />

          <ContractSettings dao={dao} daoChain={daoChain} />

          <GovernanceSettings
            dao={dao}
            daoChain={daoChain}
            includeLinks={true}
          />

          <ShamanSettings dao={dao} daoChain={daoChain} includeLinks={true} />
        </>
      )}
    </SingleColumnLayout>
  );
};
