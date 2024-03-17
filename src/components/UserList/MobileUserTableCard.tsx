import { Box, Text } from "@chakra-ui/react";

import { User } from "../../types";

function MobileUserTableCard({ user }: { user: User }) {
    const { name, username, phone, email } = user;

    return (
        <Box maxW="350px">
            <Box mb="2.5">
                <Text
                    fontSize="sm"
                    wordBreak="break-word"
                    color="gray.900"
                    fontWeight={500}
                    whiteSpace="pre-line"
                >
                    Full Name
                </Text>
                <Text fontSize="sm" color="gray.500">
                    {name}
                </Text>
            </Box>

            <Box mb="2.5">
                <Text
                    fontSize="sm"
                    wordBreak="break-word"
                    color="gray.900"
                    fontWeight={500}
                    whiteSpace="pre-line"
                >
                    Username
                </Text>
                <Text fontSize="sm" color="gray.500">
                    {username}
                </Text>
            </Box>

            <Box mb="2.5">
                <Text
                    fontSize="sm"
                    wordBreak="break-word"
                    color="gray.900"
                    fontWeight={500}
                    whiteSpace="pre-line"
                >
                    Email Address
                </Text>
                <Text fontSize="sm" color="gray.500">
                    {email}
                </Text>
            </Box>

            <Box>
                <Text
                    fontSize="sm"
                    wordBreak="break-word"
                    color="gray.900"
                    fontWeight={500}
                    whiteSpace="pre-line"
                >
                    Phone Number
                </Text>
                <Text fontSize="sm" color="gray.500">
                    {phone}
                </Text>
            </Box>
        </Box>
    );
}

export default MobileUserTableCard;
