import { Button, Stack } from "@mui/joy";
import { Component, ErrorInfo } from "react";

import PageContainer from "./layouts/pages/PageContainer";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import SimpleTextFallback from "./fallbacks/SimpleTextFallback";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error Boundary caught this: ", error, errorInfo);
  }

  handleResetError = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <PageContainer>
          <Stack spacing={2} alignItems={"center"}>
            <WarningAmberRoundedIcon sx={{ fontSize: 42 }} />
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
