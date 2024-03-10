import { Box, Card, Sheet, Table, Typography, useTheme } from "@mui/joy";

function createTeamsData(teamName, teamSize) {
  return { teamName, teamSize };
}

const teamsList = [
  createTeamsData("RCB", 23),
  createTeamsData("RCB", 23),
  createTeamsData("RCB", 23),
  createTeamsData("RCB", 23),
  createTeamsData("RCB", 23),
  createTeamsData("RCB", 23),
  createTeamsData("RCB", 23),
];

const TeamsList = () => {
  const theme = useTheme();
  return (
    <Box>
      <Typography level="h4" textAlign="center">
        All Teams
      </Typography>
      <Sheet sx={{ height: 250, overflow: "auto", mt: 4 }}>
        {teamsList.length === 0 ? (
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}>
            <Typography>Added teams will appear here.</Typography>
          </Card>
        ) : (
          <Table
            variant="outlined"
            stickyHeader
            stickyFooter
            sx={{
              td: {
                fontSize: theme.fontSize.xs,
                color: theme.palette.text.secondary,
              },
              "& thead th:nth-of-type(1)": { width: "10%" },
              "& thead th:nth-of-type(2)": { width: "60%" },
            }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Team Name</th>
                <th>Team Size</th>
              </tr>
            </thead>
            <tbody>
              {teamsList.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{row.teamName}</td>
                  <td>{row.teamSize}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={3}>
                  <Typography
                    level="body-sm"
                    fontWeight={500}
                    color={theme.palette.common.white}>
                    {`Total: ${teamsList.length} teams`}
                  </Typography>
                </th>
              </tr>
            </tfoot>
          </Table>
        )}
      </Sheet>
    </Box>
  );
};

export default TeamsList;
