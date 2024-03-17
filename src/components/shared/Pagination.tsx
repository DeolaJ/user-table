import { useMemo } from "react";
import { Box, BoxProps, Button, Flex, Icon, Text, chakra } from "@chakra-ui/react";
import { ImArrowRight2, ImArrowLeft2 } from "react-icons/im";

import OutlineButton from "./OutlineButton";

interface PaginationProps extends BoxProps {
    currentPageIndex: number;
    totalPages: number;
    canNextPage: boolean;
    canPreviousPage: boolean;
    nextPage: () => void;
    previousPage: () => void;
    gotoPage: (type: number) => void;
}

function Pagination({
    currentPageIndex,
    totalPages,
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    gotoPage,
    ...props
}: PaginationProps) {
    const pageNumbers = useMemo(() => {
        if (totalPages <= 5) {
            return Array(totalPages)
                .fill(0)
                .map((_, index) => index);
        }
        const selectedPageNumbers = [];
        const firstIndex = 0;
        const lastIndex = totalPages - 1;
        const notFirstAndLastIndex =
            currentPageIndex !== firstIndex && currentPageIndex !== lastIndex;

        // Add previous page index
        if (canPreviousPage && currentPageIndex !== firstIndex + 1) {
            if (notFirstAndLastIndex && currentPageIndex > firstIndex + 2)
                selectedPageNumbers.push("...");
            selectedPageNumbers.push(currentPageIndex - 1);
        }
        // Add current page index
        if (notFirstAndLastIndex) selectedPageNumbers.push(currentPageIndex);
        // Add next page index
        if (canNextPage && currentPageIndex !== lastIndex - 1) {
            selectedPageNumbers.push(currentPageIndex + 1);
            if (notFirstAndLastIndex && currentPageIndex < lastIndex - 2)
                selectedPageNumbers.push("...");
        }
        // If on the first page
        if (currentPageIndex === firstIndex) {
            return [firstIndex, ...selectedPageNumbers, firstIndex + 2, "...", lastIndex];
        }
        // If on the last page
        if (currentPageIndex === lastIndex) {
            return [firstIndex, "...", lastIndex - 2, ...selectedPageNumbers, lastIndex];
        }
        return [firstIndex, ...selectedPageNumbers, lastIndex];
    }, [totalPages, canNextPage, canPreviousPage, currentPageIndex]);

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
                    aria-labelledby="previous-button-label"
                >
                    <Icon as={ImArrowLeft2} boxSize="14px" aria-label="go to previous page" />
                    <Text
                        pl="3"
                        fontSize="sm"
                        display={{ base: "none", md: "block" }}
                        id="previous-button-label"
                    >
                        Previous
                    </Text>
                </OutlineButton>

                <Flex
                    gap="1"
                    alignItems="center"
                    justifyContent="center"
                    display={{ base: "none", md: "flex" }}
                >
                    {pageNumbers.map((pageIndex, index) => {
                        const isActive = pageIndex === currentPageIndex;
                        if (pageIndex === "...") {
                            return <Text key={`${pageIndex}-${index}`}>...</Text>;
                        }
                        return (
                            <Button
                                key={pageIndex}
                                bgColor={isActive ? "brand.gray.50" : "transparent"}
                                color={isActive ? "brand.gray.800" : "brand.gray.600"}
                                _hover={{
                                    color: "brand.gray.800",
                                    bgColor: "brand.gray.50",
                                }}
                                onClick={() => {
                                    if (typeof pageIndex === "string") return;
                                    gotoPage(pageIndex);
                                }}
                                p="2.5"
                                fontSize="sm"
                            >
                                {Number(pageIndex) + 1}
                            </Button>
                        );
                    })}
                </Flex>

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
                    aria-labelledby="next-button-label"
                >
                    <Text
                        pr="3"
                        fontSize="sm"
                        display={{ base: "none", md: "block" }}
                        id="next-button-label"
                    >
                        Next
                    </Text>
                    <Icon as={ImArrowRight2} boxSize="14px" aria-label="go to next page" />
                </OutlineButton>
            </Flex>
        </Box>
    );
}

export default Pagination;
