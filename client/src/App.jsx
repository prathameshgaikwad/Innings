/* eslint-disable react/prop-types */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy";
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
        <Suspense fallback={<div>Loading...</div>}>
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
              path="/tournaments/:tournamentId/match/:matchId"
              element={
                <PrivateRoute>
                  <Match />
                </PrivateRoute>
              }
            />
            <Route
              path="/tournaments/:tournamentId/match/:matchId/manage"
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
        </Suspense>
      </CssVarsProvider>
    </BrowserRouter>
  );
};

export default App;
