import React from "react";
import styled from "styled-components";
import { RiArrowLeftLine } from "react-icons/ri";

import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { SingleColumnLayout } from "@daohaus/ui";
import { ValidNetwork } from "@daohaus/keychain-utils";

import { ContractSettings } from "../components/ContractSettings";
import { GovernanceSettings } from "../components/GovernanceSettings";
import { ShamanSettings } from "../components/ShamanSettings";
import { ButtonRouterLink } from "../components/ButtonRouterLink";
import { MetadataSettings } from "../components/MetadataSettings";

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;
`;

export const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

export const Settings = () => {
  const { daoId, daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  return (
    <>
      <ButtonRow>
        <ButtonRouterLink
          color="secondary"
          variant="outline"
          to={`/molochV3/${daoChain}/${daoId}`}
          IconLeft={RiArrowLeftLine}
        >
          DAO
        </ButtonRouterLink>
        <ButtonRouterLink
          color="secondary"
          variant="outline"
          to={`/molochV3/${daoChain}/${daoId}/activate`}
          IconLeft={RiArrowLeftLine}
        >
          Activations
        </ButtonRouterLink>
      </ButtonRow>
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
