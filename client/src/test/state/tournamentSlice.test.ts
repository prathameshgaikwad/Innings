import {
  addCreatedTournament,
  addJoinedTournament,
  clearFeaturedTournaments,
  clearTournamentsData,
  setCreatedTournaments,
  setFeaturedTournaments,
  setJoinedTournaments,
  setLatestTournament,
  tournamentReducer,
} from "../../state/tournament/tournamentSlice";
import { describe, expect, it } from "vitest";

import { Tournament } from "../../types";
import { Types } from "mongoose";

describe("Tournament Slice", () => {
  const sampleTournament: Tournament = {
    _id: new Types.ObjectId(),
    admin_id: new Types.ObjectId(),
    name: "Test Tournament",
    start_date: new Date("2024-01-01"),
    end_date: new Date("2024-01-10"),
    venue: "Test Ground",
    total_overs: 20,
    teams: [new Types.ObjectId(), new Types.ObjectId()],
    fixtures: [new Types.ObjectId(), new Types.ObjectId()],
    banner_urls: {
      large: "large-banner.jpg",
      small: "small-banner.jpg",
    },
    status: "pending",
  };

  const initialState = {
    createdTournaments: [],
    joinedTournaments: [],
    featuredTournaments: [],
    latestTournament: null,
  };

  describe("addCreatedTournament", () => {
    it("should add a tournament to createdTournaments array", () => {
      const newState = tournamentReducer(
        initialState,
        addCreatedTournament(sampleTournament._id)
      );
      expect(newState.createdTournaments).toContain(sampleTournament._id);
      expect(
        newState.createdTournaments[newState.createdTournaments.length - 1]
      ).toEqual(sampleTournament._id);
    });
  });

  describe("addJoinedTournament", () => {
    it("should add tournament_id to joinedTournaments array", () => {
      const tournament_id = sampleTournament._id;
      const newState = tournamentReducer(
        initialState,
        addJoinedTournament(tournament_id)
      );
      expect(newState.joinedTournaments).toContain(tournament_id);
      expect(
        newState.joinedTournaments[newState.joinedTournaments.length - 1]
      ).toEqual(tournament_id);
    });

    it("should not add duplicate tournament_id", () => {
      const tournament_id = sampleTournament._id;
      const stateWithTournament = {
        ...initialState,
        joinedTournaments: [tournament_id],
      };
      const newState = tournamentReducer(
        stateWithTournament,
        addJoinedTournament(tournament_id)
      );
      expect(newState.joinedTournaments).toHaveLength(1);
    });
  });

  describe("setCreatedTournaments", () => {
    it("should set created tournaments array", () => {
      const tournaments = [sampleTournament._id];
      const newState = tournamentReducer(
        initialState,
        setCreatedTournaments(tournaments)
      );
      expect(newState.createdTournaments).toEqual(tournaments);
    });
  });

  describe("setJoinedTournaments", () => {
    it("should set joined tournaments array", () => {
      const tournamentIds = [sampleTournament._id];
      const newState = tournamentReducer(
        initialState,
        setJoinedTournaments(tournamentIds)
      );
      expect(newState.joinedTournaments).toEqual(tournamentIds);
    });
  });

  describe("setFeaturedTournaments", () => {
    it("should set featured tournaments array", () => {
      const tournaments = [sampleTournament._id];
      const newState = tournamentReducer(
        initialState,
        setFeaturedTournaments(tournaments)
      );
      expect(newState.featuredTournaments).toEqual(tournaments);
    });
  });

  describe("setLatestTournament", () => {
    it("should set latest tournament", () => {
      const newState = tournamentReducer(
        initialState,
        setLatestTournament(sampleTournament)
      );
      expect(newState.latestTournament).toEqual(sampleTournament);
    });
  });

  describe("clearFeaturedTournaments", () => {
    it("should clear featured tournaments array", () => {
      const stateWithFeatured = {
        ...initialState,
        featuredTournaments: [sampleTournament._id],
      };
      const newState = tournamentReducer(
        stateWithFeatured,
        clearFeaturedTournaments()
      );
      expect(newState.featuredTournaments).toHaveLength(0);
    });
  });

  describe("clearTournamentsData", () => {
    it("should reset state to initial values", () => {
      const populatedState = {
        createdTournaments: [sampleTournament._id],
        joinedTournaments: [sampleTournament._id],
        featuredTournaments: [sampleTournament._id],
        latestTournament: sampleTournament,
      };
      const newState = tournamentReducer(
        populatedState,
        clearTournamentsData()
      );
      expect(newState).toEqual(initialState);
    });
  });
});
