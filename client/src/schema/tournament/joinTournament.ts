import { object, string } from "yup";

export const joinTournamentSchema = (existingJoinedTournaments: string[]) =>
  object({
    tournament_id: string()
      .required("Required")
      .test(
        "uniqueMatchNumber",
        "You have already joined this tournament.",
        function (value) {
          return !existingJoinedTournaments.includes(value);
        }
      ),
  });
