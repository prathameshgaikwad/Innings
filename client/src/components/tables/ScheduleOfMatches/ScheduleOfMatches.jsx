/* eslint-disable react/prop-types */

import EventNoteIcon from "@mui/icons-material/EventNote";
import NoData from "../../fallbacks/NoData";
import RectangularSkeleton from "../../skeletons/RectangularSkeleton";
import ScheduleOfMatchesSheet from "./ScheduleOfMatchesSheet";
import SectionHeader from "../../layouts/sections/SectionHeader";
import SectionWrapper from "../../layouts/sections/SectionWrapper";
import TableWrapper from "../../tableComponents/TableWrapper";
import formatLongDate from "../../../utilities/helpers/formatLongDate";
import formatTime from "../../../utilities/helpers/formatTime";
import { useSelector } from "react-redux";

function createData(fixture) {
  const date = new Date(
    1970,
    0,
    1,
    parseInt(fixture.time.split(":")[0]),
    parseInt(fixture.time.split(":")[1])
  );

  return {
    match_no: fixture.match_no,
    team1: fixture.team1Details.name,
    team1Short: fixture.team1Details.nameShort,
    vs: "vs",
    team2: fixture.team2Details.name,
    team2Short: fixture.team2Details.nameShort,
    time: formatTime(date),
    date: formatLongDate(fixture.date),
  };
}

const ScheduleOfMatches = ({ isLoading }) => {
  const fixtures = useSelector((state) => state.tournamentPage.fixtures);

  const scheduleRows = fixtures.map((fixture) => createData(fixture));

  return (
    <SectionWrapper>
      <SectionHeader title={"Schedule"} startDecorator={EventNoteIcon} />
      {isLoading ? (
        <RectangularSkeleton width="80%" height="200px" />
      ) : (
        <TableWrapper>
          {scheduleRows.length === 0 ? (
            <NoData />
          ) : (
            <ScheduleOfMatchesSheet rows={scheduleRows} />
          )}
        </TableWrapper>
      )}
    </SectionWrapper>
  );
};

export default ScheduleOfMatches;
