/* eslint-disable react/prop-types */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CreateAccount from "./pages/accounts/CreateAccount";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy";
import HomePage from "./pages/home/Home";
import Match from "./pages/match/Match";
import MatchManagement from "./pages/match/MatchManagement";
import MyStatistics from "./pages/statistics/MyStatistics";
import SignIn from "./pages/accounts/SignIn";
import Statistics from "./pages/statistics/Statistics";
import TeamPage from "./pages/team/TeamPage";
import TournamentManagement from "./pages/tournaments/TournamentManagement";
import TournamentPage from "./pages/tournaments/TournamentPage";
import TournamentSetupPage from "./pages/tournaments/TournamentSetupPage";
import Tournaments from "./pages/tournaments/Tournaments";
import myTheme from "./theme";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const App = () => {
  const PrivateRoute = ({ children }) => {
    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when component mounts
    }, []);

    const isAuth = Boolean(useSelector((store) => store.user.token));

    return isAuth ? children : <Navigate to="/accounts/sign-in" />;
  };

  return (
    <BrowserRouter basename="/">
      <CssVarsProvider
        defaultMode="dark"
        disableTransitionOnChange
        theme={myTheme}>
        <CssBaseline />
        <Routes>
          {/* PUBLIC PATHS */}
          <Route path="/accounts/sign-in" element={<SignIn />} />
          <Route path="/accounts/create" element={<CreateAccount />} />

          {/* PRIVATE PATHS */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tournaments"
            element={
              <PrivateRoute>
                <Tournaments />
              </PrivateRoute>
            }
          />
          <Route
            path="/tournaments/:tournamentId"
            element={
              <PrivateRoute>
                <TournamentPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tournaments/:tournamentId/setup"
            element={
              <PrivateRoute>
                <TournamentSetupPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tournaments/:tournamentId/manage"
            element={
              <PrivateRoute>
                <TournamentManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/tournaments/:tournamentId/:matchId"
            element={
              <PrivateRoute>
                <Match />
              </PrivateRoute>
            }
          />
          <Route
            path="/tournaments/:tournamentId/:matchId/manage"
            element={
              <PrivateRoute>
                <MatchManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/tournaments/:tournamentId/teams/:teamId"
            element={
              <PrivateRoute>
                <TeamPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <PrivateRoute>
                <Statistics />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/statistics"
            element={
              <PrivateRoute>
                <MyStatistics />
              </PrivateRoute>
            }
          />
        </Routes>
      </CssVarsProvider>
    </BrowserRouter>
  );
};

export default App;
