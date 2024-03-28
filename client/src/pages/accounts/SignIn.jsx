import BackgroundArt from "../../components/accounts/BackgroundArt";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ColorSchemeToggle from "../../components/common/ColorSchemeToggle";
import Divider from "@mui/joy/Divider";
import Footer from "../../components/common/Footer";
import GlobalStyles from "@mui/joy/GlobalStyles";
import GoogleIcon from "../../../public/assets/GoogleIcon";
import Link from "@mui/joy/Link";
import LogoBox from "../../components/common/Navbar/LogoBox";
import SignInForm from "../../components/accounts/SignInForm";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { formLabelClasses } from "@mui/joy/FormLabel";
import { signInGoogle } from "../../state/user/userSlice";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUpRequest = () => {
    navigate("/accounts/create");
  };

  const handleGoogleSignInSuccess = (tokenResponse) => {
    const { access_token } = tokenResponse;
    dispatch(signInGoogle(access_token, navigate, dispatch));
  };

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: handleGoogleSignInSuccess,
  });

  return (
    <>
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
                <Typography level="h3">Sign in</Typography>
                <Typography level="body-sm">
                  New to Innings?{" "}
                  <Link
                    onClick={() => {
                      handleSignUpRequest();
                    }}
                    href="/accounts/create"
                    level="title-sm">
                    Create an account
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
                onClick={() => {
                  handleGoogleSignIn();
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
            <SignInForm />
          </Box>
          <Footer />
        </Box>
      </Box>
      <BackgroundArt />
    </>
  );
}
