import React, { ErrorInfo, ReactNode } from "react";

import Message from "./Message";

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        hasError: false,
    };

    public static getDerivedStateFromError(): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            hasError: true,
            error: error,
            errorInfo: errorInfo,
        });
    }

    render() {
        if (this.state.hasError) {
            console.error("Hitting React's error-boundary");
            console.error("Error: ");
            console.error(this.state.error);
            console.error("Error info: ");
            console.error(this.state.errorInfo);
            return (
                <Message
                    title="500"
                    description="Refresh the page"
                    helpText="If error persists, please reach out to me"
                />
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
