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
      <ParLg>Follow the steps below to deploy TBA for this avatar.</ParLg>

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
        <DataMd>Deploy the TokenBound account.</DataMd>
      </div>

      <div>
        <ParMd>
          <Bold>Step 3</Bold>
        </ParMd>
        <ParMd>Return to the DAO</ParMd>
      </div>
    </StepContainer>
  );
};
