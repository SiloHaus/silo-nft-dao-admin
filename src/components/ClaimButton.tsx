import { Button } from "@daohaus/ui";

type ClaimButtonProps = {
  tokenId: string;
  contractAddress: string;
};
export const ClaimButton = ({ tokenId, contractAddress }: ClaimButtonProps) => {
  const handleClaim = () => {
    console.log("claiming tokenId", tokenId);
  };

  return (
    <Button onClick={handleClaim} color="secondary" size="sm" fullWidth>
      Claim
    </Button>
  );
};
