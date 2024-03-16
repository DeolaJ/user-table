import { Spinner, Center, Text, FlexProps } from "@chakra-ui/react";

interface LoaderProps extends FlexProps {
    loadingText?: string;
}

function Loader({ loadingText, ...rest }: LoaderProps) {
    return (
        <Center minH="100vh" minW="100%" {...rest}>
            <Spinner size="md" emptyColor="gray.200" speed="0.55s" mr="2" />
            <Text ml="2" fontSize="xl" fontWeight={500}>
                {loadingText || "Loading..."}
            </Text>
        </Center>
    );
}

export default Loader;
