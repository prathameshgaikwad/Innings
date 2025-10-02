/* eslint-disable react/prop-types */

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy";
import PageLoader from "./components/fallbacks/PageLoader";
import myTheme from "./theme";
import { useSelector } from "react-redux";

const CreateAccount = lazy(() => import("./pages/accounts/CreateAccount"));
const HomePage = lazy(() => import("./pages/home/Home"));
const Match = lazy(() => import("./pages/match/Match"));
const MatchManagement = lazy(() => import("./pages/match/MatchManagement"));
const MyStatistics = lazy(() => import("./pages/statistics/MyStatistics"));
const SignIn = lazy(() => import("./pages/accounts/SignIn"));
const Statistics = lazy(() => import("./pages/statistics/Statistics"));
const TeamPage = lazy(() => import("./pages/team/TeamPage"));
const TournamentManagement = lazy(() =>
  import("./pages/tournaments/TournamentManagement")
);
const TournamentPage = lazy(() => import("./pages/tournaments/TournamentPage"));
const TournamentSetupPage = lazy(() =>
  import("./pages/tournaments/TournamentSetupPage")
);
const Tournaments = lazy(() => import("./pages/tournaments/Tournaments"));

const ProtectedRoute = () => {
  const isAuth = Boolean(useSelector((store) => store.user.token));
  return isAuth ? <Outlet /> : <Navigate to="/accounts/sign-in" />;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter basename="/">
      <CssVarsProvider
        defaultMode="dark"
        disableTransitionOnChange
        theme={myTheme}>
        <CssBaseline />
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* PUBLIC PATHS */}
            <Route path="/accounts/sign-in" element={<SignIn />} />
            <Route path="/accounts/create" element={<CreateAccount />} />

            {/* PRIVATE PATHS */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route
                path="/tournaments/:tournamentId"
                element={<TournamentPage />}
              />
              <Route
                path="/tournaments/:tournamentId/setup"
                element={<TournamentSetupPage />}
              />
              <Route
                path="/tournaments/:tournamentId/manage"
                element={<TournamentManagement />}
              />
              <Route
                path="/tournaments/:tournamentId/match/:matchId"
                element={<Match />}
              />
              <Route
                path="/tournaments/:tournamentId/match/:matchId/manage"
                element={<MatchManagement />}
              />
              <Route path="/teams/:teamId" element={<TeamPage />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/user/statistics" element={<MyStatistics />} />
            </Route>
          </Routes>
        </Suspense>
      </CssVarsProvider>
    </BrowserRouter>
  );
};

export default App;