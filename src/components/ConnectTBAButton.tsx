import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Loading,
} from "@daohaus/ui";
import { useState } from "react";
import { ConnectTBAInstructions } from "./ConnectTBAInstructions";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";
import { ValidNetwork } from "@daohaus/keychain-utils";
import { EthAddress } from "@daohaus/utils";
import { useTba } from "../hooks/useTba";
import { tbaAppLink } from "../utils/tokenboundHelpers";
import { DeployTBAInstructions } from "./DeployTBAInstructions";

type ClaimButtonProps = {
  tokenId: string;
  contractAddress: string;
};
export const ConnectTBAButton = ({
  tokenId,
  contractAddress,
}: ClaimButtonProps) => {
  const { daoChain } = useCurrentDao();
  const { tba, isDeployed, isError, isLoading } = useTba({
    contractAddress: contractAddress as EthAddress,
    tokenId,
    chainId: daoChain,
  });

  console.log("tba ", tba, isDeployed);

  const [open, setOpen] = useState(false);

  if (isError) return null;

  if (isLoading) return <Loading />;

  if (!isDeployed)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button color="secondary" size="sm">
            Deploy TBA
          </Button>
        </DialogTrigger>

        <DialogContent title="Deploy TBA">
          <DeployTBAInstructions
            contractAddress={contractAddress}
            tokenId={tokenId}
            daoChain={daoChain as ValidNetwork}
          />
        </DialogContent>
      </Dialog>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button color="secondary" size="sm">
          Connect
        </Button>
      </DialogTrigger>

      <DialogContent title="Connect Avatar">
        <ConnectTBAInstructions
          contractAddress={contractAddress}
          tokenId={tokenId}
          daoChain={daoChain as ValidNetwork}
        />
      </DialogContent>
    </Dialog>
  );
};
