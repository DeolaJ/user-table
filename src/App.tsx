import { chakra, ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import UsersPage from "./components/UserPage";
import ErrorBoundary from "./components/shared/ErrorBoundary";

import { theme } from "./styles/theme";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <ErrorBoundary>
                    <chakra.main px={{ base: "4", md: "6" }} py="4">
                        <UsersPage />
                    </chakra.main>
                </ErrorBoundary>
            </ChakraProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
