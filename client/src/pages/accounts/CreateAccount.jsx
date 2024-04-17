import { Box, Button, Divider, Link, Stack, Typography } from "@mui/joy";

import BackgroundArt from "../../components/accounts/BackgroundArt";
import ColorSchemeToggle from "../../components/common/ColorSchemeToggle";
import CreateAccountForm from "../../components/accounts/CreateAccountForm";
import CustomToast from "../../components/notifications/toasts/CustomToast";
import Footer from "../../components/common/Footer";
import GlobalStyles from "@mui/joy/GlobalStyles";
import GoogleIcon from "../../../public/assets/GoogleIcon";
import LogoBox from "../../components/common/Navbar/LogoBox";
import { formLabelClasses } from "@mui/joy/FormLabel";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userApi } from "../../services/api";

export default function CreateAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isFailedResponseVisible, setIsFailedResponseVisible] = useState(false);

  const handleSignInRequest = () => {
    navigate("/accounts/sign-in");
  };

  const handleGoogleSignUpSuccess = (tokenResponse) => {
    const { access_token } = tokenResponse;
    dispatch(userApi.signUpGoogle(access_token, navigate));
  };

  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: handleGoogleSignUpSuccess,
  });

  return (
    <>
      {" "}
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px",
            "--Cover-width": "50vw",
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s",
          },
        }}
      />
      {isSuccessVisible && (
        <CustomToast
          duration={2000}
          color={"success"}
          content={"Account created successfully!"}
        />
      )}
      {isFailedResponseVisible && (
        <CustomToast
          duration={2400}
          color={"warning"}
          content={"Email already exists!"}
        />
      )}
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.88)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}>
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
            }}>
            <LogoBox />
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}>
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography level="h3">Create an account</Typography>
                <Typography level="body-sm">
                  Already a user?{" "}
                  <Link
                    onClick={() => {
                      handleSignInRequest();
                    }}
                    href="/accounts/sign-in"
                    level="title-sm">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
                onClick={() => {
                  handleGoogleSignUp();
                }}>
                Continue with Google
              </Button>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                  "--Divider-lineColor": {
                    xs: "#FFF",
                    md: "var(--joy-palette-divider)",
                  },
                },
              })}>
              or
            </Divider>
            <CreateAccountForm
              setIsSuccessVisible={setIsSuccessVisible}
              setIsFailedResponseVisible={setIsFailedResponseVisible}
            />
          </Box>
          <Footer />
        </Box>
      </Box>
      <BackgroundArt />
    </>
  );
}
