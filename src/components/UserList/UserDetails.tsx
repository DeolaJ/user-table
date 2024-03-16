import { Flex, Text, Box, chakra } from "@chakra-ui/react";

import { User } from "../../types";

type UserDetailsProps = {
    user?: User;
};

function UserDetails({ user }: UserDetailsProps) {
    if (!user) return null;

    const { name, username, phone, email, address, website, company } = user;

    return (
        <Box>
            <Box flexDir="column" justifyContent="flex-start" mb="6">
                <Text fontSize="sm" fontWeight="500" mb="1">
                    Name
                </Text>
                <Text color="gray.600">{name}</Text>
            </Box>

            <Box flexDir="column" justifyContent="flex-start" mb="6">
                <Text fontSize="sm" fontWeight="500" mb="1">
                    Username
                </Text>
                <Text color="gray.600">{username}</Text>
            </Box>

            <Box flexDir="column" justifyContent="flex-start" mb="6">
                <Text fontSize="sm" fontWeight="500" mb="1">
                    Email
                </Text>
                <Text color="gray.600">{email}</Text>
            </Box>

            <Box flexDir="column" justifyContent="flex-start" mb="6">
                <Text fontSize="sm" fontWeight="500" mb="1">
                    Address
                </Text>
                <Flex flexDir="column" gap="0.5">
                    <Text fontSize="sm" color="gray.600">
                        <chakra.span fontWeight={500}>Suite:</chakra.span> {address.suite}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        <chakra.span fontWeight={500}>Street:</chakra.span> {address.street}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        <chakra.span fontWeight={500}>City:</chakra.span> {address.suite}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        <chakra.span fontWeight={500}>Zip Code:</chakra.span> {address.suite}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        <chakra.span fontWeight={500}>Geolocation:</chakra.span> Lat:
                        {address.geo.lat}, Logitude: {address.geo.lng}
                    </Text>
                </Flex>
            </Box>

            <Box flexDir="column" justifyContent="flex-start" mb="6">
                <Text fontSize="sm" fontWeight="500" mb="1">
                    Phone
                </Text>
                <Text color="gray.600">{phone}</Text>
            </Box>

            <Box flexDir="column" justifyContent="flex-start" mb="6">
                <Text fontSize="sm" fontWeight="500" mb="1">
                    Website
                </Text>
                <Text color="gray.600">{website}</Text>
            </Box>

            <Box flexDir="column" justifyContent="flex-start" mb="6">
                <Text fontSize="sm" fontWeight="500" mb="1">
                    Company
                </Text>
                <Flex flexDir="column" gap="0.5">
                    <Text fontSize="sm" color="gray.600">
                        <chakra.span fontWeight={500}>Name:</chakra.span> {company.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        <chakra.span fontWeight={500}>Catch Phrase:</chakra.span>{" "}
                        {company.catchPhrase}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                        <chakra.span fontWeight={500}>BS:</chakra.span> {company.bs}
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
}

export default UserDetails;
