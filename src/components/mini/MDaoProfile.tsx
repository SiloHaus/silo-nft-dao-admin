import { AddressDisplay, Button, Card, H4, ProfileAvatar } from "@daohaus/ui";
import styled from "styled-components";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { ValidNetwork } from "@daohaus/keychain-utils";

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
  console.log("dao", dao);
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
      <Button size="sm" color="secondary">
        My Profile
      </Button>
    </MDaoOverview>
  );
};
