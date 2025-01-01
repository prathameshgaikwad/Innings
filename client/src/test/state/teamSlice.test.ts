import { Player, TeamPerformance } from "../../types";
import {
  clearTeamData,
  setTeam,
  teamReducer,
} from "../../state/team/teamSlice";
import { describe, expect, it } from "vitest";

import { Types } from "mongoose";

const players: Player[] = [
  {
    _id: new Types.ObjectId(),
    team_id: new Types.ObjectId(),
    tournament_id: new Types.ObjectId(),
    first_name: "Rohit",
    last_name: "Sharma",
    debut: new Date("2003-01-01"),
    picture_url: "rohit.jpg",
    statistics: {
      matches: 10,
      total_runs: 450,
      strike_rate: 150.5,
      average: 45.0,
      highest_score: { runs: 89, dismissed: true },
      fifties: 3,
      hundreds: 0,
      fours: 35,
      sixes: 20,
      total_dismissals: 8,
      balls_faced: 300,
      runs_conceded: 0,
      balls_bowled: 0,
      wickets_taken: 0,
      extras: {
        wides: 0,
        no_balls: 0,
        byes: 0,
        leg_byes: 0,
        penalty_runs: 0,
      },
      maidens: 0,
      economy: 0,
    },
    match_performances: [],
  },
  {
    _id: new Types.ObjectId(),
    team_id: new Types.ObjectId(),
    tournament_id: new Types.ObjectId(),
    first_name: "Virat",
    last_name: "Kohli",
    debut: new Date("2013-01-01"),
    picture_url: "virat.jpg",
    statistics: {
      matches: 10,
      total_runs: 450,
      strike_rate: 150.5,
      average: 45.0,
      highest_score: { runs: 89, dismissed: true },
      fifties: 3,
      hundreds: 0,
      fours: 35,
      sixes: 20,
      total_dismissals: 8,
      balls_faced: 300,
      runs_conceded: 120,
      balls_bowled: 60,
      wickets_taken: 5,
      extras: {
        wides: 2,
        no_balls: 1,
        byes: 0,
        leg_byes: 0,
        penalty_runs: 0,
      },
      maidens: 1,
      economy: 6.5,
    },
    match_performances: [],
  },
];

describe("Team Slice", () => {
  describe("setTeam", () => {
    it("should set team data correctly", () => {
      const initialState = {
        name: "",
        team_color: "",
        players: [],
        captain_name: "",
        logo_url: "",
        performance: null,
      };

      const teamData = {
        name: "Test Team",
        team_color: "#FF3344",
        players: players,
        captain_name: "Rohit Sharma",
        logo_url: "team-india.png",
        performance: {
          matches: 10,
          win: 5,
          loss: 4,
          draw: 1,
          points: 11,
          nrr: 0.5,
        } as TeamPerformance,
      };

      const newState = teamReducer(initialState, setTeam(teamData));
      expect(newState).toEqual(teamData);
    });
  });

  describe("clearTeamData", () => {
    it("should reset state to initial values", () => {
      const existingState = {
        name: "Test Team",
        team_color: "#FF0000",
        players: players,
        captain_name: "Player",
        logo_url: "logo.png",
        performance: {
          matches: 5,
          win: 3,
          loss: 2,
          draw: 0,
          points: 7,
          nrr: 0.2,
        } as TeamPerformance,
      };

      const newState = teamReducer(existingState, clearTeamData());
      expect(newState).toEqual({
        name: "",
        team_color: "",
        players: [],
        captain_name: "",
        logo_url: "",
        performance: null,
      });
    });
  });
});
