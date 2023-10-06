import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { SingleColumnLayout } from "@daohaus/ui";

import DaoOverview from "../components/DaoOverview";

export function Dao() {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  return (
    <SingleColumnLayout>
      {daoChain && dao && <DaoOverview daoChain={daoChain} dao={dao} />}
    </SingleColumnLayout>
  );
}

export default Dao;
