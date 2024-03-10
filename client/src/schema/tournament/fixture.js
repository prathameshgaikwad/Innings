import { mixed, number, object, ref, string } from "yup";

export const fixtureSchema = (teams, existingMatchNumbers) =>
  object({
    matchNumber: number()
      .required("Required")
      .positive("Match number must be a positive number")
      .integer("Match number must be an integer")
      .test(
        "uniqueMatchNumber",
        "Match number must be unique",
        function (value) {
          return !existingMatchNumbers.includes(value);
        }
      ),
    team1: mixed()
      .oneOf(
        [...["default"], ...teams.map((team) => team._id)],
        "Must be distinct"
      )
      .required("Required"),
    team2: mixed()
      .test("notEqual", "Teams must be distinct", function (value) {
        const team1 = this.resolve(ref("team1"));
        return value !== team1;
      })
      .oneOf(
        [...["default"], ...teams.map((team) => team._id)],
        "Must be distinct"
      )
      .required("Required"),
    overs: number()
      .required("Required")
      .positive("Overs must be a positive number")
      .integer("Overs must be an integer"),
    matchDate: string().required("Required"),
    matchTime: string().required("Required"),
  });
