/* eslint-disable react/prop-types */

import { Box, Card, Divider, Grid, Typography, useTheme } from "@mui/joy";

const DataChip = ({ title, value }) => {
  const theme = useTheme();
  return (
    <Grid xs={4}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 5,
          p: 0,
          opacity: value > 0 ? 1 : 0.5,
          bgcolor: theme.palette.neutral.softDisabledBg,
        }}>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Typography level="body-xs" sx={{ p: 0.5, px: 1 }}>
            {title}
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs" sx={{ p: 0.5, px: 1 }}>
            {value}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

export default DataChip;
