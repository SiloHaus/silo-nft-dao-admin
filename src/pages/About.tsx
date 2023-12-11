import { useDHConnect } from "@daohaus/connect";
import { HomeDashboard } from "../components/hub/HomeDashboard";
import { HomeNotConnected } from "../components/hub/HomeNotConnected";
import { H2, H3, Link, ParMd, SingleColumnLayout } from "@daohaus/ui";

export const About = () => {
  return (
    <SingleColumnLayout>
      <H2>Understanding Token Bound Accounts (TBAs)</H2>

      <ParMd>
        Token Bound Accounts (TBAs) utilize the ERC6551 standard, a cutting-edge
        protocol gaining momentum and supported by the pioneering efforts of the
        Future Primitive team.
      </ParMd>

      <H3>Key Features:</H3>

      <ol>
        <ParMd>
          <strong>Individualized Smart Contract Accounts:</strong> With TBAs,
          each Non-Fungible Token (NFT) functions as its own smart contract
          account, employing a form of account abstraction.
        </ParMd>

        <ParMd>
          <strong>Versatile Transactions:</strong> NFTs with TBAs have the
          capability to receive tokens and other NFTs, and possess the same
          functionality as an Externally Owned Account (EOA).
        </ParMd>

        <ParMd>
          <strong>Diverse Interactions:</strong> TBAs enable seamless
          interaction with Decentralized Autonomous Organizations (DAOs),
          decentralized finance (DeFi) platforms, and facilitate the reception
          of airdrops.
        </ParMd>

        <ParMd>
          <strong>Owner Control:</strong> The owner of the NFT retains complete
          control over the associated TBA, ensuring autonomy in its operations.
        </ParMd>

        <ParMd>
          <strong>Default TBA for NFTs:</strong> As per this standard, every NFT
          automatically possesses a designated address capable of receiving
          funds, tokens, or other NFTs.
        </ParMd>
      </ol>

      <h2>How to Interact with TBAs:</h2>

      <ParMd>
        <strong>TBA Deployment:</strong> Initiating interaction with the TBA as
        the NFT owner involves a single transaction to deploy the smart contract
        account. This can be accomplished conveniently at{" "}
        <Link href="https://tokenbound.org">tokenbound.org</Link>.
      </ParMd>

      <ParMd>
        <strong>TBA Functionality:</strong> At{" "}
        <Link href="https://tokenbound.org">tokenbound.org</Link>, users can
        access comprehensive insights into the assets held within the TBA.
        Additionally, the platform supports WalletConnect, enabling seamless
        integration with decentralized applications (dApps) through your TBA.
      </ParMd>

      <ParMd>
        <strong>Resource Hub:</strong>{" "}
        <Link href="https://tokenbound.org">tokenbound.org</Link> serves as an
        informational hub akin to Etherscan for TBAs, offering detailed and
        comprehensive information about individual TBAs.
      </ParMd>
        <hr/>
      <H2>Understanding SILO Retro Active DAO Formation (RDF)</H2>

      <ParMd>
        SILO Retro Active DAO Formation (RDF) enables the transformation of any
        NFT (ERC-721) into a DAO by leveraging Token Bound Accounts (TBAs).
      </ParMd>

      <H3>Key Features:</H3>

      <ol>
        <ParMd>
          <strong>NFT Upgrade to DAO:</strong> Each NFT has the potential to be
          upgraded to a DAO through the utilization of TBAs.
        </ParMd>
        <ParMd>
          <strong>Voting Representation:</strong> Each NFT represents one voting
          unit, granting execution rights within the DAO.
        </ParMd>
        <ParMd>
          <strong>Airdrop Incentives:</strong> NFTs claiming governance also
          receive an airdrop of a specific amount of the community token (meme
          token).
        </ParMd>
        <ParMd>
          <strong>Meme Token Functionality:</strong> The meme token, a
          transferable fixed supply asset, is distributed through airdrops, with
          a portion controlled by the DAO. It acts as a tool to gauge sentiment
          and gather signals from the community to drive the DAO's objectives.
        </ParMd>
        <ParMd>
          <strong>DAO Avatar:</strong> Each NFT effectively functions as its own
          avatar within the DAO, allowing delegation and voting rights.
        </ParMd>
        <ParMd>
          <strong>NFT Transferability:</strong> Beyond its DAO functions, each
          NFT retains its characteristic as a transferable NFT, providing
          versatility in ownership.
        </ParMd>
      </ol>

      <ParMd>
        SILO RDF enables NFTs to transcend their standard functionality,
        empowering them as active participants in the DAO ecosystem while
        maintaining their inherent transferability and ownership attributes.
      </ParMd>
    </SingleColumnLayout>
  );
};
