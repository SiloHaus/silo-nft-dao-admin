import React, { ChangeEvent } from "react";
import styled, { useTheme } from "styled-components";

import { Card, DataMd, DataSm, ParLg, ParSm, ParXs, Select } from "@daohaus/ui";
import {
  useCurrentDao,
  useDaoData,
  useDaoMembers,
} from "@daohaus/moloch-v3-hooks";
import { MemberProfileAvatar } from "@daohaus/moloch-v3-macro-ui";
import { formatValueTo, fromWei, votingPowerPercentage } from "@daohaus/utils";
import { ValidNetwork } from "@daohaus/keychain-utils";

const MemberListContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: none;
  width: 100%;
`;

const MemberItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const MemberStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// const memberFilters = [
//   {
//     name: "All Members",
//     value: "all",
//   },
//   {
//     name: "Delegates",
//     value: "delegates",
//   },
//   {
//     name: "Avatars",
//     value: "avatars",
//   },
//   {
//     name: "Holders",
//     value: "holders",
//   },
// ];

export const NftDaoMemberList = ({
  daoId,
  daoChain,
}: {
  daoId: string;
  daoChain: ValidNetwork;
}) => {
  const { members } = useDaoMembers({
    daoId,
    daoChain,
    filter: { shares_gte: "1", dao: daoId },
  });
  const { dao } = useDaoData();
  const theme = useTheme();

  // const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
  //   console.log("e", e.target.value);
  // };

  if (!daoChain || !daoId || !dao) return null;

  return (
    <MemberListContainer>
      <MemberStats>
        <ParSm>Avatars</ParSm>
        <DataMd>
          {formatValueTo({
            value: fromWei(dao.totalShares),
            decimals: 2,
            format: "numberShort",
          })}
        </DataMd>
      </MemberStats>
      {/* <Select
        id="member-filter"
        options={memberFilters}
        onChange={handleFilter}
      /> */}
      {members &&
        members.map((member) => {
          return (
            <MemberItem key={member.id}>
              <MemberProfileAvatar
                daoChain={daoChain}
                daoId={daoId}
                memberAddress={member.memberAddress}
                allowLinks={true}
              />
              <ParXs color={theme.secondary.step10}>
                {`${votingPowerPercentage(
                  dao.totalShares,
                  member.delegateShares
                )} %`}
              </ParXs>
            </MemberItem>
          );
        })}
    </MemberListContainer>
  );
};
