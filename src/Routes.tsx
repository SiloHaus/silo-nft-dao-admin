import { useEffect } from "react";
import {
  Routes as Router,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";

import { ReactSetter } from "@daohaus/utils";

import { Home } from "./pages/Home";
import { Settings } from "./pages/Settings";
import { Proposals } from "./pages/Proposals";
import { Proposal } from "./pages/Proposal";
import { Member } from "./pages/Member";
import { TARGET_DAO } from "./targetDao";
import { MULTI_DAO_ROUTER } from "@daohaus/moloch-v3-hooks";
import { HomeContainer } from "./components/layout/HomeContainer";
import UpdateSettings from "./pages/UpdateSettings";
import NewProposal from "./pages/NewProposal";
import { DaoContainer } from "./components/layout/DaoContainer";
import { ClaimContainer } from "./components/layout/ClaimContainer";
import { Dao } from "./pages/Dao";
import { About } from "./pages/About";
import { AllSafes } from "./pages/AllSafes";

export const Routes = ({
  setDaoChainId,
}: {
  setDaoChainId: ReactSetter<string | undefined>;
}) => {
  const location = useLocation();
  const pathMatch = matchPath("molochv3/:daochain/:daoid/*", location.pathname);

  useEffect(() => {
    if (TARGET_DAO[import.meta.env.VITE_TARGET_KEY]?.CHAIN_ID) {
      setDaoChainId(TARGET_DAO[import.meta.env.VITE_TARGET_KEY].CHAIN_ID);
    }
    if (pathMatch?.params?.daochain) {
      setDaoChainId(pathMatch?.params?.daochain);
    }
    if (!pathMatch?.params?.daochain) {
      setDaoChainId(undefined);
    }
  }, [pathMatch?.params?.daochain, setDaoChainId]);

  return (
    <Router>
      <Route path="/" element={<HomeContainer />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route
        path={`${MULTI_DAO_ROUTER}/activate`}
        element={<ClaimContainer />}
      />
      <Route path={MULTI_DAO_ROUTER} element={<DaoContainer />}>
        <Route index element={<Dao />} />
        <Route path="settings" element={<Settings />} />
        <Route path="safes" element={<AllSafes />} />
        <Route path="settings/update" element={<UpdateSettings />} />
        <Route path="proposals" element={<Proposals />} />
        <Route path="proposal/:proposalId" element={<Proposal />} />
        <Route path="new-proposal" element={<NewProposal />} />
        <Route path="member/:memberAddress" element={<Member />} />
      </Route>
    </Router>
  );
};
