import { useMemo } from "react";
import styled from "styled-components";

import { H3, ParMd, DataIndicator, widthQuery, Card } from "@daohaus/ui";
import { charLimit, formatLongDateFromSeconds } from "@daohaus/utils";
import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";
import { useDHConnect } from "@daohaus/connect";
import { useDaoMember } from "@daohaus/moloch-v3-hooks";

import { DaoProfileAvatar } from "./DaoProfile";
import { ButtonRouterLink } from "./ButtonRouterLink";
import { TagList } from "./layout/TagList";
import { daoProfileHasLinks } from "../utils/daoDataDisplayHelpers";
import { SettingsLinkList } from "./layout/MetadataLinkLists";
import { SettingsContainer } from "./layout/GeneralLayouts";

const MetaSettingsContainer = styled(SettingsContainer)`
  width: 100%;
`;

const MetaCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const MetaContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 3.4rem;
  .links {
    margin: 1.2rem 0;
  }
`;

type MetadataSettingsProps = {
  dao: MolochV3Dao;
  daoChain: ValidNetwork;
  includeLinks?: boolean;
};

export const MetadataSettings = ({
  dao,
  daoChain,
  includeLinks,
}: MetadataSettingsProps) => {
  const { address } = useDHConnect();
  const { member } = useDaoMember({
    daoId: dao.id,
    daoChain: daoChain as keyof Keychain,
    memberAddress: address,
  });

  const enableActions = useMemo(() => {
    return member && Number(member.shares) > 0;
  }, [member]);

  return (
    <MetaSettingsContainer>
      <MetaCardHeader>
        <H3>Metadata</H3>
        {includeLinks && enableActions && (
          <ButtonRouterLink
            color="secondary"
            to={`/molochv3/${daoChain}/${dao.id}/settings/update`}
          >
            Update Metadata
          </ButtonRouterLink>
        )}
      </MetaCardHeader>
      <MetaContent>
        <div>
          <DataIndicator
            label="DAO Name"
            data={charLimit(dao.name, 21)}
            size="sm"
          />

          <DataIndicator
            label="Summon Date"
            data={formatLongDateFromSeconds(dao.createdAt)}
            size="sm"
          />

          <DataIndicator
            label="Description"
            data={charLimit(dao.description, 500)}
            size="sm"
          />
          {dao.tags && (
            <div className="tags">
              <TagList tags={dao.tags} />
            </div>
          )}
        </div>
        <div className="links">
          {daoProfileHasLinks(dao.links) && (
            <SettingsLinkList links={dao.links} />
          )}
        </div>
      </MetaContent>
    </MetaSettingsContainer>
  );
};
