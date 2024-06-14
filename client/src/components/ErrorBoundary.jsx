import { Button, Stack } from "@mui/joy";

import { Component } from "react";
import PageContainer from "./layouts/pages/PageContainer";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import SimpleTextFallback from "./fallbacks/SimpleTextFallback";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught this: ", error, errorInfo);
  }

  handleResetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <PageContainer>
          <Stack spacing={2} alignItems={"center"}>
            <WarningAmberRoundedIcon color="danger" sx={{ fontSize: 42 }} />
            <SimpleTextFallback content={"Something went wrong!"} level="h3" />
            <Button
              endDecorator={<ReplayRoundedIcon />}
              onClick={() => this.handleResetError()}>
              Try Again
            </Button>
          </Stack>
        </PageContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
