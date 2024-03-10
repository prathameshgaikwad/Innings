import { Box } from "@mui/joy";

const BackgroundArt = () => {
  return (
    <Box
      sx={(theme) => ({
        height: "100%",
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
        transition:
          "background-image var(--Transition-duration), left var(--Transition-duration) !important",
        transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
        backgroundColor: "background.level1",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1629285483773-6b5cde2171d7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        [theme.getColorSchemeSelector("dark")]: {
          backgroundImage:
            "url(https://images.unsplash.com/photo-1587385789097-0197a7fbd179?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        },
      })}
    />
  );
};

export default BackgroundArt;
