import styled from "styled-components";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { MolochV3Dao, MolochV3Member } from "@daohaus/moloch-v3-data";
import { H5, DataXs, AddressDisplay, DataIndicator, ParMd } from "@daohaus/ui";
import {
  AccountProfile,
  formatLongDateFromSeconds,
  formatValueTo,
  fromWei,
  votingPowerPercentage,
} from "@daohaus/utils";

import {
  AvatarLarge,
  ProfileContainer,
  ProfileDataGrid,
  ProfileMetadataContainer,
  ProfileNameContainer,
  PSubContainer,
} from "./ProfileCard.styles";
import {
  MemberProfileAvatar,
  MemberProfileMenu,
} from "@daohaus/moloch-v3-macro-ui";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DataIndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DataIndicatorLabelMd = styled(ParMd)`
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

type ProfileProps = {
  daoChain: ValidNetwork;
  dao: MolochV3Dao;
  profile: AccountProfile;
  membership?: MolochV3Member;
  allowLinks?: boolean;
  allowMemberMenu?: boolean;
};

export const Profile = ({
  daoChain,
  dao,
  profile,
  membership,
  allowLinks = false,
  allowMemberMenu = false,
}: ProfileProps) => {
  return (
    <ProfileContainer>
      <PSubContainer>
        <ProfileMetadataContainer>
          <AvatarLarge
            image={profile?.avatar || ""}
            size="lg"
            alt="profile image"
            address={profile.address}
          />
          <Container>
            <ProfileNameContainer>
              {profile?.ens && <H5>{profile?.ens || ""}</H5>}
            </ProfileNameContainer>
            {profile.address && (
              <AddressDisplay
                address={membership?.memberAddress || profile.address}
                truncate
                textOverride={profile?.ens}
                copy
              />
            )}
            {!membership && (
              <>
              <ParMd className="warn">DAO Profile Not Found</ParMd>
              <ParMd className="warn">Delegate Power to this account to participate.</ParMd>
              </>
            )}
            {membership && (
              <DataXs as="span">
                Joined {formatLongDateFromSeconds(membership?.createdAt)}
              </DataXs>
            )}
          </Container>
        </ProfileMetadataContainer>
        {membership && (
          <MemberProfileMenu
            daoChain={daoChain}
            daoId={dao.id}
            memberAddress={membership.memberAddress || profile.address}
            allowLinks={allowLinks}
            allowMemberMenu={allowMemberMenu}
          />
        )}
      </PSubContainer>
      {membership && dao && (
        <>
          <ProfileDataGrid>
            <DataIndicator
              label="Delegated Power"
              data={formatValueTo({
                value: votingPowerPercentage(
                  dao?.totalShares || "0",
                  membership.delegateShares
                ),
                decimals: 2,
                format: "percent",
              })}
            />
          </ProfileDataGrid>
          {membership.delegatingTo !== membership.memberAddress && (
            <DataIndicatorContainer>
              <DataIndicatorLabelMd>Delegating To</DataIndicatorLabelMd>
              <MemberProfileAvatar
                daoChain={daoChain}
                daoId={dao.id}
                memberAddress={membership.delegatingTo}
                allowLinks={allowLinks}
              />
            </DataIndicatorContainer>
          )}
        </>
      )}
    </ProfileContainer>
  );
};
