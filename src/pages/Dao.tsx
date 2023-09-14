import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { SingleColumnLayout } from "@daohaus/ui";

import DaoOverview from "../components/DaoOverview";

export function Dao() {
  const { daoChain, daoId } = useCurrentDao();

  return (
    <SingleColumnLayout>
      {daoId && daoChain && <DaoOverview daoChain={daoChain} daoId={daoId} />}
    </SingleColumnLayout>
  );
}

export default Dao;
