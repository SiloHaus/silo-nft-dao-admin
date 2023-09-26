import { ValidNetwork } from "@daohaus/keychain-utils";
import {
  Bold,
  Button,
  DataLg,
  DataMd,
  H4,
  Link,
  ParLg,
  ParMd,
} from "@daohaus/ui";
import { TOKENBOUND_URL } from "../utils/constants";
import { styled } from "styled-components";
import { useDHConnect } from "@daohaus/connect";

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LinkContainer = styled.div`
  display: flex;
  align-content: center;
  gap: 1rem;
`;

const LinkPar = styled(ParMd)`
  color: ${({ theme }) => theme.link.color};
  cursor: pointer;
`;

const HelperLink = styled.div`
  margin-top: 2rem;
`;

export const ConnectTBAInstructions = ({
  contractAddress,
  tokenId,
  daoChain,
}: {
  contractAddress: string;
  tokenId: string;
  daoChain: ValidNetwork;
}) => {
  const { disconnect, connectWallet } = useDHConnect();

  const handleConnectionHelper = () => {
    disconnect();

    setTimeout(() => {
      connectWallet();
    }, 1000);
  };

  return (
    <StepContainer>
      <ParLg>Follow the steps below to connect this NFT to the DAO.</ParLg>

      <div>
        <ParMd>
          <Bold>Step 1</Bold>
        </ParMd>
        <LinkContainer>
          <DataMd>
            Open the{" "}
            <Link
              href={`${TOKENBOUND_URL[daoChain]}/${contractAddress}/${tokenId}`}
            >
              <DataMd>TokenBound</DataMd>
            </Link>{" "}
            app.
          </DataMd>
        </LinkContainer>
      </div>
      <div>
        <ParMd>
          <Bold>Step 2</Bold>
        </ParMd>
        <DataMd>
          Come back to this DAO app and disconnect current wallet.
        </DataMd>
      </div>

      <div>
        <ParMd>
          <Bold>Step 3</Bold>
        </ParMd>
        <ParMd>
          Copy Wallet Connect Code and use on the Connect with NFT button in the
          TokenBound app.
        </ParMd>
      </div>

      <div>
        <ParMd>
          <Bold>Step 4</Bold>
        </ParMd>
        <ParMd>Return here to interact with the DAO as your Avatar.</ParMd>
      </div>

      <HelperLink>
        <LinkPar onClick={handleConnectionHelper}>
          Click to disconnect current address and open Wallet Connect for code
          (Steps 2 and 3).
        </LinkPar>
      </HelperLink>
    </StepContainer>
  );
};
