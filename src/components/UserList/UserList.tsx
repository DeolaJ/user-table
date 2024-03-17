import { ChangeEvent, useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    createColumnHelper,
} from "@tanstack/react-table";
import { Text, Box, Flex, BoxProps, TableContainer, useDisclosure, Select } from "@chakra-ui/react";

import UserDrawer from "../UserDrawer";
import UserTable from "./UserTables";

import GlobalTableFilter from "../shared/GlobalTableFilter";
import Pagination from "../shared/Pagination";
import OutlineButton from "../shared/OutlineButton";
import Message from "../shared/Message";

import { User } from "../../types";

import { pageSizes } from "../constants/userlist";

interface UserListProps extends BoxProps {
    users: User[];
}

const columnHelper = createColumnHelper<User>();

function UserList({ users }: UserListProps) {
    const data = useMemo(() => users, [users]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [userId, setUserId] = useState<number>(Number.MIN_SAFE_INTEGER);
    const [globalFilter, setGlobalFilter] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    function closeDrawer() {
        setUserId(Number.MIN_SAFE_INTEGER);
        onClose();
    }

    function openDrawer(userId: number) {
        setUserId(userId);
        onOpen();
    }

    const columns = useMemo(
        () => [
            columnHelper.accessor("name", {
                header: "Full Name",
                cell: (props) => props.getValue(),
            }),
            columnHelper.accessor("username", {
                header: "Username",
                cell: (props) => props.getValue(),
            }),
            columnHelper.accessor("email", {
                header: "Email Address",
                cell: (props) => props.getValue(),
            }),
            columnHelper.accessor("phone", {
                header: "Phone Number",
                cell: (props) => props.getValue(),
            }),
        ],
        [],
    );

    const {
        previousPage,
        nextPage,
        getRowModel,
        getState,
        getPageCount,
        getCanPreviousPage,
        getCanNextPage,
        getHeaderGroups,
        setPageIndex,
    } = useReactTable({
        columns,
        data,
        state: {
            globalFilter,
            pagination,
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
        autoResetPageIndex: true,
        enableHiding: true,
        enableGlobalFilter: true,
    });

    const {
        pagination: { pageIndex },
    } = getState();

    const isEmptyFilteredList = globalFilter && getRowModel().rows.length === 0 && pageIndex === 0;

    return (
        <Flex
            flexDir="column"
            flexGrow={1}
            px="2"
            pb="12"
            pt="3"
            minH="85vh"
            justifyContent="flex-start"
        >
            <Box px={{ md: "2" }} py="2.5" mb="2">
                <Flex
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", sm: "center" }}
                    mb="2"
                    gap="3"
                    flexDir={{ base: "column", sm: "row" }}
                >
                    <Text fontWeight={500} textTransform="capitalize">
                        {data?.length} {data?.length === 1 ? "user" : "users"}
                    </Text>
                    <Flex
                        flexDir={{ base: "column", sm: "row" }}
                        alignItems={{ base: "flex-start", sm: "center" }}
                        w={{ base: "100%", sm: "auto" }}
                        gap="3"
                    >
                        <Box w={{ base: "100%", sm: "auto" }}>
                            <Text display={{ sm: "none" }} mb="1" fontSize="sm">
                                Select page size
                            </Text>
                            <Select
                                value={pagination.pageSize}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                    setPagination((prevPagination) => ({
                                        ...prevPagination,
                                        pageSize: Number(e.target.value),
                                    }));
                                }}
                                maxW="80px"
                                aria-label="Select page size"
                                variant="primary"
                            >
                                {pageSizes.map((size) => (
                                    <option value={size} key={size}>
                                        {size}
                                    </option>
                                ))}
                            </Select>
                        </Box>
                        <Box w={{ base: "100%", sm: "auto" }}>
                            <Text display={{ sm: "none" }} mb="1" fontSize="sm">
                                Search users
                            </Text>
                            <GlobalTableFilter
                                globalFilter={globalFilter}
                                setGlobalFilter={setGlobalFilter}
                                bgColor="white"
                                placeholder="Search users..."
                                w="100%"
                                maxW={{ md: "400px" }}
                            />
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {isEmptyFilteredList ? (
                <Message minH="50vh" description="There are no users for this filter">
                    <OutlineButton onClick={() => setGlobalFilter("")} mt="4">
                        Clear filter
                    </OutlineButton>
                </Message>
            ) : (
                <>
                    <TableContainer
                        borderRadius="lg"
                        border="1px solid"
                        borderColor={{ base: "body.200", md: "body.100" }}
                    >
                        <UserTable
                            rowModel={getRowModel()}
                            headerGroups={getHeaderGroups()}
                            openDrawer={openDrawer}
                        />
                    </TableContainer>

                    {getPageCount() > 1 && (
                        <Pagination
                            currentPageIndex={pageIndex}
                            totalPages={getPageCount()}
                            canNextPage={getCanNextPage()}
                            canPreviousPage={getCanPreviousPage()}
                            nextPage={nextPage}
                            previousPage={previousPage}
                            gotoPage={setPageIndex}
                            my="4"
                        />
                    )}

                    <UserDrawer
                        onClose={closeDrawer}
                        isOpen={isOpen}
                        userId={userId}
                        users={users}
                    />
                </>
            )}
        </Flex>
    );
}

export default UserList;
