import React from "react";
import styled from "styled-components";
import {
  AddressDisplay,
  Card,
  H5,
  ParLg,
  ParMd,
  ProfileAvatar,
  widthQuery,
} from "@daohaus/ui";

export const MProfileCard = styled(Card)`
  width: 64rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const AvatarLarge = styled(ProfileAvatar)`
  height: 12rem;
  width: 12rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2.8rem;
  border-radius: 0.8rem;
`;

export const ProfileNameContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const NonMemberCard = ({ address }: { address?: string }) => {
  if (!address) return null;

  return (
    <MProfileCard>
      <Container>
        <AvatarLarge size="lg" alt="profile image" address={address} />
        <ProfileContainer>
          <AddressDisplay address={address} truncate copy />
          <ParMd>Address is not a member</ParMd>
        </ProfileContainer>
      </Container>
    </MProfileCard>
  );
};
