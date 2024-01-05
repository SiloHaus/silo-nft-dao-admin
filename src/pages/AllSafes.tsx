import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import styled from "styled-components";
import { RiArrowLeftLine } from "react-icons/ri";

import { CondensedSafeCard } from "../components/CondensedSafeCard";
import { ButtonRouterLink } from "../components/ButtonRouterLink";

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;
  margin-bottom: 2rem;
`;

export const AllSafes = () => {

  const { dao } = useDaoData();
  const { daoId, daoChain } = useCurrentDao();

  if (!daoChain || !dao ) return null;

  return (
    <>
    <ButtonRow>
        <ButtonRouterLink
          color="secondary"
          variant="outline"
          to={`/molochV3/${daoChain}/${daoId}`}
          IconLeft={RiArrowLeftLine}
        >
          DAO
        </ButtonRouterLink>
      </ButtonRow>
      {dao.vaults.map((vault, idx) => (
        <CondensedSafeCard
          key={idx}
          dao={dao}
          daoChain={daoChain}
          safe={vault}
          includeLinks={true}
        />
      ))}
    </>
  );


  }
