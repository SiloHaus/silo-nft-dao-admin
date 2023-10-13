import styled, { useTheme } from "styled-components";
import { Link } from "react-router-dom";
import { PiGearSix } from "react-icons/pi";

import {
  AddressDisplay,
  Card,
  H4,
  ParXs,
  ProfileAvatar,
  widthQuery,
} from "@daohaus/ui";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { useDHConnect } from "@daohaus/connect";

import { ButtonRouterLink } from "../ButtonRouterLink";
import { daoProfileHasLinks } from "../../utils/daoDataDisplayHelpers";
import { OverviewIconLinkList } from "../layout/MetadataLinkLists";

const MDaoOverview = styled(Card)`
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
  border: none;
  text-align: center;
  @media ${widthQuery.md} {
    width: 100%;
  }
`;

export const DaoProfileAvatar = styled(ProfileAvatar)`
  width: 7.5rem;
  height: 7.5rem;
`;

const ProfileHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  .avatar {
    flex: 1;
    display: flex;
    justify-content: center;
    transform: translateX(1rem);
  }
  .settings-link {
    width: 3rem;
    height: 3rem;
  }
`;

type MDaoProfileProps = {
  dao: MolochV3Dao;
  daoChain: string;
};

export const MDaoProfile = ({ dao, daoChain }: MDaoProfileProps) => {
  const theme = useTheme();
  const { address } = useDHConnect();

  return (
    <MDaoOverview>
      <ProfileHeader>
        <div className="avatar">
          <DaoProfileAvatar image={dao.avatarImg} address={dao.id} />
        </div>
        <Link to={`/molochV3/${daoChain}/${dao.id}/settings`}>
          <div className="settings-link">
            <PiGearSix size="1.5rem" color={theme.addressDisplay.icon.color} />
          </div>
        </Link>
      </ProfileHeader>
      <H4>{dao.name}</H4>
      <AddressDisplay
        address={dao.id}
        truncate
        copy
        explorerNetworkId={daoChain as ValidNetwork}
      />
      <ParXs>{dao.description}</ParXs>
      {daoProfileHasLinks(dao.links) && (
        <OverviewIconLinkList links={dao.links} />
      )}
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
