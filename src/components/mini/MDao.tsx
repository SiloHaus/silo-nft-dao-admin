import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { ProposalList, SafeCard } from "@daohaus/moloch-v3-macro-ui";

export const MDao = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  if (!daoChain || !dao) return null;

  return (
    <>
      <SafeCard dao={dao} daoChain={daoChain} safe={dao.vaults[0]} />
      <ProposalList />
    </>
  );
};
