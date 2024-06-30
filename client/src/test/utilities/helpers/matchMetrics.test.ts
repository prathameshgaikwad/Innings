import { describe, expect, it } from "vitest";
import {
  getCompletedBallsInOver,
  getCompletedOvers,
  getCurrentRunRate,
  getMatchProgress,
  getOversFromBallsCompleted,
} from "../../../utilities/helpers/matchMetrics";

describe("Match Metrics Utilities", () => {
  describe("getCompletedOvers", () => {
    it("should correctly calculate completed overs", () => {
      expect(getCompletedOvers(0)).toBe(0);
      expect(getCompletedOvers(6)).toBe(1);
      expect(getCompletedOvers(13)).toBe(2.1);
      expect(getCompletedOvers(25)).toBe(4.1);
      expect(getCompletedOvers(36)).toBe(6.0);
    });
  });
  describe("getOversFromBallsCompleted", () => {
    it("should correctly calculate completed overs from balls completed", () => {
      expect(getOversFromBallsCompleted(0)).toBe(0);
      expect(getOversFromBallsCompleted(6)).toBe(1);
      expect(getOversFromBallsCompleted(13)).toBe(2);
      expect(getOversFromBallsCompleted(25)).toBe(4);
      expect(getOversFromBallsCompleted(36)).toBe(6);
    });
  });
  describe("getCompletedBallsInOver", () => {
    it("should correctly calculate completed balls in an over", () => {
      expect(getCompletedBallsInOver(0)).toBe(0);
      expect(getCompletedBallsInOver(6)).toBe(0);
      expect(getCompletedBallsInOver(13)).toBe(1);
      expect(getCompletedBallsInOver(25)).toBe(1);
      expect(getCompletedBallsInOver(41)).toBe(5);
    });
  });
  describe("getCurrentRunRate", () => {
    it("should correctly calculate current run rate", () => {
      expect(
        getCurrentRunRate({ total_runs: 0, total_overs_completed: 5 })
      ).toBe("0.00");
      expect(
        getCurrentRunRate({ total_runs: 10, total_overs_completed: 5 })
      ).toBe("2.00");
      expect(
        getCurrentRunRate({ total_runs: 23, total_overs_completed: 2 })
      ).toBe("11.50");
    });
    it("should handle decimal overs", () => {
      expect(
        getCurrentRunRate({ total_runs: 50, total_overs_completed: 9.5 })
      ).toBe("5.08");
    });
  });
  describe("getMatchProgress", () => {
    it("should correctly calculate match progress while first innings", () => {
      expect(
        getMatchProgress({
          balls_completed: 60,
          total_overs: 20,
          current_innings_no: 1,
        })
      ).toBe(25);
      expect(
        getMatchProgress({
          balls_completed: 120,
          total_overs: 20,
        })
      ).toBe(50);
    });
    it("should correctly calculate match progress while second innings", () => {
      expect(
        getMatchProgress({
          balls_completed: 60,
          total_overs: 20,
          current_innings_no: 2,
        })
      ).toBe(75);
      expect(
        getMatchProgress({
          balls_completed: 120,
          total_overs: 20,
          current_innings_no: 2,
        })
      ).toBe(100);
    });
  });
});
