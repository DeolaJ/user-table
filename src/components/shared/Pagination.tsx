import { Box, BoxProps, Flex, Icon, Text, chakra } from "@chakra-ui/react";
import { ImArrowRight2, ImArrowLeft2 } from "react-icons/im";

import OutlineButton from "./OutlineButton";

interface PaginationProps extends BoxProps {
    currentPageIndex: number;
    totalPages: number;
    canNextPage: boolean;
    canPreviousPage: boolean;
    nextPage: () => void;
    previousPage: () => void;
}

function Pagination({
    currentPageIndex,
    totalPages,
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    ...props
}: PaginationProps) {
    return (
        <Box w="full" {...props}>
            <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                fontSize="sm"
                gap="1"
            >
                <OutlineButton
                    onClick={previousPage}
                    isDisabled={!canPreviousPage}
                    aria-disabled={!canPreviousPage}
                    px={{ base: "3", md: "3.5" }}
                    py={{ base: "3", md: "2" }}
                >
                    <Icon as={ImArrowLeft2} boxSize="14px" aria-label="go to previous page" />
                    <Text pl="3" fontSize="sm" display={{ base: "none", md: "block" }}>
                        Previous
                    </Text>
                </OutlineButton>

                <Box display={{ base: "block", md: "none" }}>
                    Page <chakra.span fontWeight={500}>{currentPageIndex + 1}</chakra.span> of{" "}
                    <chakra.span fontWeight={500}>{totalPages}</chakra.span>
                </Box>

                <OutlineButton
                    onClick={nextPage}
                    isDisabled={!canNextPage}
                    aria-disabled={!canNextPage}
                    px={{ base: "3", md: "3.5" }}
                    py={{ base: "3", md: "2" }}
                >
                    <Text pr="3" fontSize="sm" display={{ base: "none", md: "block" }}>
                        Next
                    </Text>
                    <Icon as={ImArrowRight2} boxSize="14px" aria-label="go to next page" />
                </OutlineButton>
            </Flex>
        </Box>
    );
}

export default Pagination;
