import { useParams } from "react-router-dom";

import { DaoHausNav, useDHConnect } from "@daohaus/connect";
import { TXBuilder } from "@daohaus/tx-builder";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { CurrentDaoProvider, useDaoData } from "@daohaus/moloch-v3-hooks";
import { MainLayout, OuterLayout } from "@daohaus/ui";

import { Claim } from "../../pages/Claim";
import { Header } from "./SharedLayout";

export const ClaimContainer = () => {
  const { proposalId, memberAddress, daoChain, daoId } = useParams<{
    daoChain: ValidNetwork;
    daoId: string;
    proposalId: string;
    memberAddress: string;
  }>();

  if (!daoId || !daoChain) return null;

  return (
    <ClaimGuts
      daoId={daoId}
      daoChain={daoChain}
      proposalId={proposalId}
      memberAddress={memberAddress}
    />
  );
};

const ClaimGuts = ({
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

  if (!dao) return null;

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
            <div className="left-nav">{<p>smilo</p>}</div>
            <DaoHausNav />
          </Header>

          <MainLayout>
            <Claim dao={dao} />
          </MainLayout>
        </OuterLayout>
      </TXBuilder>
    </CurrentDaoProvider>
  );
};
