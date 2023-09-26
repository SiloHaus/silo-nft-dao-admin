import { useState } from "react";

import { Button, Dialog, DialogContent, DialogTrigger } from "@daohaus/ui";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { ManageDelegate } from "@daohaus/moloch-v3-macro-ui";
import { useDHConnect } from "@daohaus/connect";

export const DelegateButton = () => {
  const { daoChain, daoId } = useCurrentDao();

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button color="secondary" size="sm" fullWidth>
          Delegate
        </Button>
      </DialogTrigger>

      <DialogContent title="Delegate">
        {daoChain && daoId && (
          <ManageDelegate
            daoChain={daoChain}
            daoId={daoId}
            defaultMember={address}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
