/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CustomToast from "../notifications/toasts/CustomToast";
import TournamentBanner from "./TournamentBanner";
import TournamentInfo from "./TournamentInfo";
import { tournamentPageApi } from "../../services/api";

const TournamentHeader = ({ id, isAdmin, isSetupComplete }) => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    dispatch(
      tournamentPageApi.getTournamentDetails({ id, token, setIsLoading })
    );
  }, [dispatch, id, token]);

  const details = useSelector((state) => state.tournamentPage.details);
  const teams = useSelector((state) => state.tournamentPage.teams);

  let name = "";
  let adminName = "";
  let venue = "";
  let startDate = "";
  let endDate = "";
  let total_overs = "";
  let bannerURL = "";
  let teamsLength = teams.length;

  if (details) {
    name = details.name;
    adminName = details.adminName;
    venue = details.venue;
    startDate = details.start_date;
    endDate = details.end_date;
    total_overs = details.total_overs;
    if (details.banner_urls) bannerURL = details.banner_urls.large;
  }

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 3200);
  }, []);

  return (
    <>
      {!isSetupComplete && !isLoading && isOpen && (
        <CustomToast
          color={"success"}
          duration={3000}
          content={`${name} created successfully!`}
        />
      )}
      <TournamentBanner
        id={id}
        isAdmin={isAdmin}
        name={name}
        isSetupComplete={isSetupComplete}
        bannerURL={bannerURL}
        isLoading={isLoading}
      />
      <TournamentInfo
        createdBy={adminName}
        teamsLength={teamsLength}
        venue={venue}
        startDate={startDate}
        endDate={endDate}
        total_overs={total_overs}
        isLoading={isLoading}
      />
    </>
  );
};

export default TournamentHeader;
