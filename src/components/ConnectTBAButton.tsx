import { Button, Dialog, DialogContent, DialogTrigger } from "@daohaus/ui";
import { useState } from "react";
import { ConnectTBAInstructions } from "./ConnectTBAInstructions";
import { NFT_ADDRESS } from "../utils/constants";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { ValidNetwork } from "@daohaus/keychain-utils";

type ClaimButtonProps = {
  tokenId: string;
  contractAddress: string;
};
export const ConnectTBAButton = ({
  tokenId,
  contractAddress,
}: ClaimButtonProps) => {
  const { daoChain } = useCurrentDao();

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button color="secondary" size="sm" fullWidth>
          Connect
        </Button>
      </DialogTrigger>

      <DialogContent title="TBA Connect">
        <ConnectTBAInstructions
          contractAddress={contractAddress}
          tokenId={tokenId}
          daoChain={daoChain as ValidNetwork}
        />
      </DialogContent>
    </Dialog>
  );
};
