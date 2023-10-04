import { BsArrowLeft } from "react-icons/bs";
import styled from "styled-components";

import {
  useCurrentDao,
  useDaoData,
  useDaoMember,
} from "@daohaus/moloch-v3-hooks";
import {
  ParLg,
  SingleColumnLayout,
  Loading,
  useBreakpoint,
  widthQuery,
} from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";

import { ButtonRouterLink } from "../components/ButtonRouterLink";
import { ProfileNftList } from "../components/ProfileNftList";
import { NonMemberCard } from "../components/NonMemberCard";
import { useParams } from "react-router-dom";
import { DelegateButton } from "../components/DelegateButton";
import { useTba, useTbaMember } from "../hooks/useTba";
import { TbaProfile } from "../components/TbaProfile";
import { EthAddress } from "@daohaus/utils";
import { MemberProfileCard } from "../components/MemberProfileCard";

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
    button:first-child {
      margin-bottom: 1rem;
    }
  }
`;

const StyledArrowLeft = styled(BsArrowLeft)`
  height: 1.6rem;
  width: 1.6rem;
`;

export const Member = () => {
  const { isFetched, isFetching, member } = useDaoMember();
  const { address } = useDHConnect();
  const { daoChain, daoId } = useCurrentDao();
  const { dao } = useDaoData();
  const { memberAddress } = useParams();

  const { isDeployed, tbaAddress } = useTbaMember({
    memberAddress: address as EthAddress,
    chainId: daoChain,
  });

  const isMobile = useBreakpoint(widthQuery.sm);

  if (!daoChain || !daoId) return <ParLg>DAO Not Found</ParLg>;

  const isConnectedMember =
    member?.memberAddress.toLowerCase() === address?.toLowerCase();

  if (!dao || !daoChain) return <Loading />;

  return (
    <SingleColumnLayout>
      <ButtonsContainer>
        <ButtonRouterLink
          to={`/molochv3/${daoChain}/${daoId}/members`}
          IconLeft={StyledArrowLeft}
          color="secondary"
          linkType="no-icon-external"
          variant="outline"
          fullWidth={isMobile}
        >
          MEMBERS
        </ButtonRouterLink>
        {isConnectedMember && member && Number(member.shares) > 0 && (
          <DelegateButton />
        )}
      </ButtonsContainer>
      {!member && isFetching && <Loading size={12} />}
      {!member && isFetched && <NonMemberCard address={memberAddress} />}

      <>
        {member &&
          member.memberAddress && (
            <>
              {isDeployed && address && <TbaProfile tbaAddress={address} />}
              <MemberProfileCard
                daoChain={daoChain}
                daoId={daoId}
                member={member}
              />
            </>
          )}

        {memberAddress && (
          <ProfileNftList
            dao={dao}
            address={memberAddress}
            daoChain={daoChain}
            isHolder={isConnectedMember}
          />
        )}
      </>
    </SingleColumnLayout>
  );
};
