import { KeyboardEvent, useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    createColumnHelper,
    flexRender,
} from "@tanstack/react-table";
import {
    Text,
    Box,
    Flex,
    BoxProps,
    Table,
    Tbody,
    Tr,
    Td,
    Thead,
    Th,
    TableContainer,
    useDisclosure,
} from "@chakra-ui/react";

import UserDrawer from "./UserDrawer";

import GlobalTableFilter from "../shared/GlobalTableFilter";
import Pagination from "../shared/Pagination";
import Message from "../shared/Message";
import OutlineButton from "../shared/OutlineButton";

import { User } from "../../types";

interface UserListProps extends BoxProps {
    users: User[];
}

const columnHelper = createColumnHelper<User>();

function UserList({ users }: UserListProps) {
    const data = useMemo(() => users, [users]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [userId, setUserId] = useState<number>(Number.MIN_SAFE_INTEGER);
    const [globalFilter, setGlobalFilter] = useState("");

    function closeDrawer() {
        setUserId(Number.MIN_SAFE_INTEGER);
        onClose();
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
    } = useReactTable({
        columns,
        data,
        state: {
            globalFilter,
            pagination: {
                pageSize: 25,
                pageIndex: 0,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
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
            <Box px="2" py="2.5" mb="4">
                <Flex
                    justifyContent="space-between"
                    alignItems={{ base: "flex-start", sm: "center" }}
                    mb="2"
                    gap="2"
                    flexDir={{ base: "column", sm: "row" }}
                >
                    <Text fontWeight={500} color="brand.gray.900" textTransform="capitalize">
                        {data?.length} {data?.length === 1 ? "user" : "users"}
                    </Text>
                    <GlobalTableFilter
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                        bgColor="white"
                        placeholder="Search users..."
                        maxW="400px"
                    />
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
                    <TableContainer borderRadius="lg" border="1px solid" borderColor="body.100">
                        <Table>
                            <Thead>
                                {getHeaderGroups().map((headerGroup) => (
                                    <Tr key={headerGroup.id}>
                                        {headerGroup.headers.map((column) => (
                                            <Th
                                                key={column.id}
                                                px="3"
                                                py="5"
                                                bgColor="body.200"
                                                color="body.500"
                                            >
                                                {flexRender(
                                                    column.column.columnDef.header,
                                                    column.getContext(),
                                                )}
                                            </Th>
                                        ))}
                                    </Tr>
                                ))}
                            </Thead>
                            <Tbody>
                                {getRowModel().rows.map((row) => (
                                    <Tr
                                        key={row.id}
                                        tabIndex={0}
                                        onClick={() => {
                                            setUserId(row.original.id);
                                            onOpen();
                                        }}
                                        onKeyDown={(e: KeyboardEvent<HTMLTableRowElement>) => {
                                            if (
                                                e.key === " " ||
                                                e.key === "Enter" ||
                                                e.key === "Space"
                                            ) {
                                                e.preventDefault();
                                                setUserId(row.original.id);
                                                onOpen();
                                            }
                                        }}
                                        cursor="pointer"
                                        _hover={{ bgColor: "body.100" }}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <Td
                                                key={cell.id}
                                                borderColor="body.100"
                                                px="3"
                                                py="5"
                                                fontSize="sm"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </Td>
                                        ))}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    {getPageCount() > 1 && (
                        <Pagination
                            currentPageIndex={pageIndex}
                            totalPages={getPageCount()}
                            canNextPage={getCanNextPage()}
                            canPreviousPage={getCanPreviousPage()}
                            nextPage={nextPage}
                            previousPage={previousPage}
                            px={{ base: "4", md: "6" }}
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
