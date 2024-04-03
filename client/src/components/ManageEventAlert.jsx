/* eslint-disable react/prop-types */

import {
  Alert,
  Box,
  Button,
  IconButton,
  Link,
  Typography,
  useTheme,
} from "@mui/joy";

import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";

const ManageEventAlert = ({ eventType }) => {
  const theme = useTheme();
  const { tournamentId } = useParams();
  const { matchId } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pageLink =
    eventType === "match"
      ? `/tournaments/${tournamentId}/${matchId}/manage`
      : `/tournaments/${tournamentId}/manage`;

  return (
    <Button
      variant="solid"
      color="primary"
      size={isMobile ? "sm" : "lg"}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "fixed",
        zIndex: 100,
        bottom: isMobile ? 15 : 30,
        left: isMobile ? 15 : 30,
        p: 2,
      }}>
      <Link
        overlay
        href={pageLink}
        sx={{
          "&:hover": {
            textDecoration: "none",
          },
        }}>
        <Typography
          sx={{ color: "white" }}
          level={isMobile ? "title-sm" : "title-md"}
          startDecorator={
            <MdOutlineAdminPanelSettings size={isMobile ? 24 : 32} />
          }>
          Manage this {eventType}
        </Typography>
      </Link>
    </Button>
  );
};

export default ManageEventAlert;
