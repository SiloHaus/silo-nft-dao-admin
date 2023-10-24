import { Outlet, useParams } from "react-router-dom";
import { styled } from "styled-components";

import { DaoHausNav, useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { CurrentDaoProvider, useDaoData } from "@daohaus/moloch-v3-hooks";
import { Card, Footer, MainLayout, OuterLayout, widthQuery } from "@daohaus/ui";
import { Header } from "./SharedLayout";
import { Brand } from "../Brand";
import { BiColumnLayout } from "./BiColumnLayout/BiColumnLayout";
import { DaoProfile } from "../DaoProfile";
import { NftDaoMemberList } from "../NftDaoMemberList";

const LeftColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  @media ${widthQuery.sm} {
    width: 100%;
  }
`;

const RightColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  @media ${widthQuery.sm} {
    width: 100%;
  }
`;

export const DaoContainer = () => {
  const { proposalId, memberAddress, daoChain, daoId } = useParams<{
    daoChain: ValidNetwork;
    daoId: string;
    proposalId: string;
    memberAddress: string;
  }>();

  if (!daoId || !daoChain) return null;

  return (
    <Dao
      daoId={daoId}
      daoChain={daoChain}
      proposalId={proposalId}
      memberAddress={memberAddress}
    />
  );
};

const Dao = ({
  daoId,
  daoChain,
  proposalId,
  memberAddress,
}: {
  daoId: string;
  daoChain: ValidNetwork;
  proposalId?: string;
  memberAddress?: string;
}) => {
  const { publicClient, address } = useDHConnect();
  const { dao } = useDaoData({
    daoId: daoId as string,
    daoChain: daoChain as string,
  });

  return (
    <CurrentDaoProvider
      userAddress={address}
      targetDao={{
        daoChain: daoChain,
        daoId: daoId,
        proposalId,
        memberAddress,
      }}
    >
      <TXBuilder
        publicClient={publicClient}
        chainId={daoChain}
        daoId={daoId}
        safeId={dao?.safeAddress}
        appState={{ dao, memberAddress: address }}
      >
        <OuterLayout>
          <Header>
            <div className="left-nav">{<Brand />}</div>
            <DaoHausNav />
          </Header>

          <MainLayout>
            <BiColumnLayout
              left={
                dao &&
                daoChain && (
                  <LeftColumnContainer>
                    <DaoProfile dao={dao} daoChain={daoChain} />
                    <NftDaoMemberList />
                  </LeftColumnContainer>
                )
              }
              right={
                dao &&
                daoChain && (
                  <RightColumnContainer>
                    <Outlet />
                  </RightColumnContainer>
                )
              }
            ></BiColumnLayout>
          </MainLayout>
          <Footer />
        </OuterLayout>
      </TXBuilder>
    </CurrentDaoProvider>
  );
};
