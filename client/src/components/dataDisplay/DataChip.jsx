/* eslint-disable react/prop-types */

import { Box, Card, Divider, Grid, Typography } from "@mui/joy";

const DataChip = ({ data }) => {
  return (
    <Grid xs={4}>
      <Card variant="outlined" sx={{ borderRadius: 5, p: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Typography level="body-xs" sx={{ p: 0.5 }}>
            {data[0]}
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs" sx={{ p: 0.5 }}>
            {data[1]}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

export default DataChip;
