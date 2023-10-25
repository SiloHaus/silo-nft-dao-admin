import { useMemo } from "react";
import { BsPlusLg } from "react-icons/bs";

import { useCurrentDao, useDaoData } from "@daohaus/moloch-v3-hooks";
import { ProposalList, SafeCard } from "@daohaus/moloch-v3-macro-ui";
import { Button, Dialog, DialogContent, DialogTrigger } from "@daohaus/ui";
import { NewProposalList } from "../components/NewProposalList";
import { prepareProposals } from "../utils/formHelpers";
import {
  ADVANCED_PROPOSAL_FORMS_APP,
  BASIC_PROPOSAL_FORMS_APP,
} from "../legos/legoConfig";

export const Dao = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  const basicProposals = prepareProposals(BASIC_PROPOSAL_FORMS_APP);
  const advancedProposals = prepareProposals(ADVANCED_PROPOSAL_FORMS_APP);

  const targetVault = useMemo(() => {
    if (!dao) return;
    //toggle for daos that use the treasury?
    return dao.vaults.find((v) => v.safeAddress !== dao?.safeAddress);
  }, [dao]);

  if (!daoChain || !dao || !targetVault) return null;

  return (
    <>
      <SafeCard dao={dao} daoChain={daoChain} safe={targetVault} />
      <ProposalList
        allowLinks={true}
        rightActionEl={
          <Dialog>
            <DialogTrigger asChild>
              <Button IconLeft={BsPlusLg}>New Proposal</Button>
            </DialogTrigger>
            <DialogContent title="Choose Proposal Type">
              <NewProposalList
                basicProposals={basicProposals}
                advancedProposals={advancedProposals}
              />
            </DialogContent>
          </Dialog>
        }
      />
    </>
  );
};
