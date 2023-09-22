import { Button } from "@daohaus/ui";

type ClaimButtonProps = {
  tokenId: string;
  contractAddress: string;
  isClaimed?: boolean;
};
export const ClaimButton = ({
  tokenId,
  contractAddress,
  isClaimed = false,
}: ClaimButtonProps) => {
  const handleClaim = () => {
    console.log("claiming tokenId, contractAddress", tokenId, contractAddress);
  };

  return (
    <Button
      onClick={handleClaim}
      color="secondary"
      size="sm"
      fullWidth
      disabled={isClaimed}
    >
      {isClaimed ? "Claimed" : "Claim"}
    </Button>
  );
};
