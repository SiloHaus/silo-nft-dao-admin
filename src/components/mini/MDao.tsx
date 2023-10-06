import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { ProposalList, SafeCard } from "@daohaus/moloch-v3-macro-ui";
import { BiColumnLayout, Card } from "@daohaus/ui";
import { styled } from "styled-components";
import { MDaoProfile } from "./MDaoProfile";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MDaoMembers = styled(Card)`
  width: 14.4rem;
  /* width: 18rem; */
  height: 51.2rem;
`;

export const MDao = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  return (
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
            <SafeCard dao={dao} daoChain={daoChain} safe={dao.vaults[0]} />
            <ProposalList />
          </ColumnContainer>
        )
      }
    ></BiColumnLayout>
  );
};
