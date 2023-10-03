import { styled } from "styled-components";
import {
  Card,
  DataIndicator,
  H4,
  ProfileAvatar,
  SingleColumnLayout,
  widthQuery,
} from "@daohaus/ui";
import {
  charLimit,
  formatValueTo,
  fromWei,
  lowerCaseLootToken,
} from "@daohaus/utils";
import { Keychain, ValidNetwork } from "@daohaus/keychain-utils";
import { useDaoData, useDaoMembers } from "@daohaus/moloch-v3-hooks";

import { DaoProfile } from "./DaoProfile";
import { useMemo } from "react";
import { useClaimShaman } from "../hooks/useClaimShaman";
import { useNftCollectionMetadata } from "../hooks/useNftCollectionMetadata";
import { MolochV3Dao } from "@daohaus/moloch-v3-data";

export const OverviewCard = styled(Card)`
  width: 64rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const TokensCard = styled(OverviewCard)`
  padding: 2.4rem;
`;

export const OverviewDataGrid = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

  div {
    padding: 2rem 0;
  }
`;

export const DaoProfileContainer = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.card.radius};
  border: 1px ${({ theme }) => theme.secondary.step5} solid;
  background-color: ${({ theme }) => theme.secondary.step3};
  padding: 2.2rem;
  .avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.7rem;
    margin-bottom: 2.7rem;
    p {
      margin-right: auto;
    }
    @media ${widthQuery.xs} {
      flex-direction: column;
    }
  }
`;

export const DaoProfileAvatar = styled(ProfileAvatar)`
  width: 18rem;
  height: 18rem;
`;

export const MissingProfileCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.3rem;
`;

export const TagListContainer = styled.div`
  margin-top: 2.8rem;
`;

type DaoOverviewProps = {
  daoChain: ValidNetwork;
  graphApiKeys?: Keychain;
  dao: MolochV3Dao;
};

export const DaoOverview = ({ daoChain, dao }: DaoOverviewProps) => {
  const { members } = useDaoMembers();
  const { sdata } = useClaimShaman({
    dao,
    chainId: daoChain,
  });

  const { nft } = useNftCollectionMetadata({
    contractAddress: sdata?.nft.result,
    chainId: daoChain,
  });

  const shareHolderCount = useMemo(() => {
    return members.filter((mem) => mem.shares !== "0").length;
  }, [members]);

  if (!dao) return null;

  return (
    <SingleColumnLayout>
      {dao && (
        <>
          <OverviewCard>
            <DaoProfile dao={dao} />
            <OverviewDataGrid>
              <DataIndicator
                label="Total in Safes"
                data={formatValueTo({
                  value: dao.fiatTotal,
                  decimals: 2,
                  format: "currencyShort",
                })}
              />
              <DataIndicator label="Avatars" data={shareHolderCount} />
              <DataIndicator label="Proposals" data={dao.proposalCount} />
              <DataIndicator
                label="Active Proposals"
                data={dao.activeProposals?.length || "0"}
              />
            </OverviewDataGrid>
          </OverviewCard>
          <TokensCard>
            <H4>Tokens</H4>
            <OverviewDataGrid>
              <DataIndicator label="NFT Collection" data={nft?.name} />
              <DataIndicator
                label="Claimed"
                data={formatValueTo({
                  value: fromWei(dao.totalShares),
                  decimals: 2,
                  format: "numberShort",
                })}
              />
            </OverviewDataGrid>
            <OverviewDataGrid>
              <DataIndicator
                label="Meme"
                data={charLimit(lowerCaseLootToken(dao.lootTokenName), 20)}
              />
              <DataIndicator
                label="Supply"
                data={formatValueTo({
                  value: fromWei(dao.totalLoot),
                  decimals: 2,
                  format: "numberShort",
                })}
              />
            </OverviewDataGrid>
          </TokensCard>
        </>
      )}
    </SingleColumnLayout>
  );
};

export default DaoOverview;
