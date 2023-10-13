import { useMemo } from "react";

import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { ProposalList, SafeCard } from "@daohaus/moloch-v3-macro-ui";

export const Dao = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  const targetVault = useMemo(() => {
    if (!dao) return;
    //toggle for daos that use the treasury?
    return dao.vaults.find((v) => v.safeAddress !== dao?.safeAddress);
  }, [dao]);

  if (!daoChain || !dao || !targetVault) return null;

  return (
    <>
      <SafeCard dao={dao} daoChain={daoChain} safe={targetVault} />
      <ProposalList allowLinks={true} />
    </>
  );
};
