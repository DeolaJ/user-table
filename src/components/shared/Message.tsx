import { PropsWithChildren } from "react";
import { Box, Center, FlexProps, Heading, Text } from "@chakra-ui/react";

interface MessageProps extends FlexProps {
    description: string;
    title?: string;
    helpText?: string;
}

function Message({
    description,
    title,
    helpText,
    children,
    ...props
}: PropsWithChildren<MessageProps>) {
    return (
        <Center minH="100vh" minW="100%" {...props}>
            <Box textAlign="center" maxW="400px" mx="auto">
                {title && (
                    <Heading as="h1" mb="2" color="red.500">
                        {title}
                    </Heading>
                )}
                <Text>{description}</Text>
                {helpText && (
                    <Text fontSize="xs" mt="0.5">
                        {helpText}
                    </Text>
                )}
                {children}
            </Box>
        </Center>
    );
}

export default Message;
