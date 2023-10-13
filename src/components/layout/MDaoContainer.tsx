import { Outlet, useParams } from "react-router-dom";
import { styled } from "styled-components";

import { DaoHausNav, useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { CurrentDaoProvider, useDaoData } from "@daohaus/moloch-v3-hooks";
import {
  BiColumnLayout,
  Card,
  Footer,
  MainLayout,
  OuterLayout,
} from "@daohaus/ui";
import { MDaoProfile } from "../mini/MDaoProfile";
import { Header } from "./SharedLayout";
import { Brand } from "../mini/Brand";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MDaoMembers = styled(Card)`
  width: 14.4rem;
  height: 51.2rem;
`;

export const MDaoContainer = () => {
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
                  <ColumnContainer>
                    <MDaoProfile dao={dao} daoChain={daoChain} />
                    <MDaoMembers />
                  </ColumnContainer>
                )
              }
              right={
                dao &&
                daoChain && (
                  <ColumnContainer>
                    <Outlet />
                  </ColumnContainer>
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
