import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";

import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { SingleColumnLayout } from "@daohaus/ui";
import { MetadataSettings } from "@daohaus/moloch-v3-macro-ui";
import { ValidNetwork } from "@daohaus/keychain-utils";

import { ContractSettings } from "../components/ContractSettings";
import { GovernanceSettings } from "../components/GovernanceSettings";
import { ShamanSettings } from "../components/ShamanSettings";
import { ButtonRouterLink } from "../components/ButtonRouterLink";

export const Settings = () => {
  const { daoId, daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  return (
    <>
      <ButtonRouterLink
        color="secondary"
        variant="outline"
        to={`/molochV3/${daoChain}/${daoId}`}
        IconLeft={RiArrowLeftLine}
      >
        DAO
      </ButtonRouterLink>
      <SingleColumnLayout>
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
    </>
  );
};
