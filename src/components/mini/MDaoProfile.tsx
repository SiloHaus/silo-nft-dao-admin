import styled from "styled-components";

import { AddressDisplay, Card, H4, ProfileAvatar } from "@daohaus/ui";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useDHConnect } from "@daohaus/connect";

import { ButtonRouterLink } from "../ButtonRouterLink";

const MDaoOverview = styled(Card)`
  width: 14.4rem;
  height: 20rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
  border: none;
  text-align: center;
`;

export const DaoProfileAvatar = styled(ProfileAvatar)`
  width: 7.5rem;
  height: 7.5rem;
`;

type MDaoProfileProps = {
  dao: MolochV3Dao;
  daoChain: string;
};

export const MDaoProfile = ({ dao, daoChain }: MDaoProfileProps) => {
  const { address } = useDHConnect();

  return (
    <MDaoOverview>
      <DaoProfileAvatar image={dao.avatarImg} address={dao.id} />
      <H4>{dao.name}</H4>
      <AddressDisplay
        address={dao.id}
        truncate
        copy
        explorerNetworkId={daoChain as ValidNetwork}
      />
      {address && (
        <ButtonRouterLink
          size="sm"
          color="secondary"
          to={`/molochV3/${daoChain}/${dao.id}/member/${address}`}
        >
          My Profile
        </ButtonRouterLink>
      )}
    </MDaoOverview>
  );
};
