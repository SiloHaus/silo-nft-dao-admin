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
  ParSm,
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

export const DeployTBAInstructions = ({
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
      <ParLg>
        A TBA lets you own assets and participate in DAOs. All as your NFT.
      </ParLg>
      <ParSm>Follow the steps below to deploy TBA for this avatar.</ParSm>

      <div>
        <ParMd>
          <Bold>Step 1</Bold>
        </ParMd>
        <LinkContainer>
          <DataMd>
            Open the tokenbound app. (TokenBound is like etherscan for TBAs.)
          </DataMd>
        </LinkContainer>
      </div>
      <div>
        <ParMd>
          <Bold>Step 2: Deploy</Bold>
        </ParMd>
        <DataMd>Click the big button to <strong>deploy</strong> the TokenBound account.</DataMd>
      </div>

      <div>
        <ParMd>
          <Bold>Step 3</Bold>
        </ParMd>
        <ParMd>
          <strong>Return to the DAO.</strong> You can now delegate to your self
          or even connect to the dao directly using your TBA and wallet connect.
        </ParMd>
      </div>
      <div>
        <ParMd> </ParMd>
        <Link
          href={`${TOKENBOUND_URL[daoChain]}/${contractAddress}/${tokenId}`}
        >
          <DataMd>Go to the TokenBound app now</DataMd>
        </Link>{" "}
      </div>
    </StepContainer>
  );
};
