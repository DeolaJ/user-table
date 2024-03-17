import { KeyboardEvent } from "react";
import { flexRender, RowModel, HeaderGroup } from "@tanstack/react-table";
import { Table, Tbody, Tr, Td, Thead, Th, useBreakpointValue } from "@chakra-ui/react";

import MobileUserTableCard from "./MobileUserTableCard";

import { User } from "../../types";

type UserTableProps = {
    rowModel: RowModel<User>;
    headerGroups: HeaderGroup<User>[];
    openDrawer: (userId: number) => void;
};

function UserTable({ rowModel, headerGroups, openDrawer }: UserTableProps) {
    const isMobile = useBreakpointValue(
        {
            base: true,
            md: false,
        },
        {
            fallback: "md",
        },
    );

    return (
        <Table>
            <Thead display={{ base: "none", md: "table-header-group" }}>
                {headerGroups.map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <Th key={column.id} px="3" py="5" bgColor="body.200" color="body.500">
                                {flexRender(column.column.columnDef.header, column.getContext())}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody>
                {isMobile ? (
                    <MobileTableBodyRows rowModel={rowModel} openDrawer={openDrawer} />
                ) : (
                    <DesktopTableBodyRows rowModel={rowModel} openDrawer={openDrawer} />
                )}
            </Tbody>
        </Table>
    );
}

function DesktopTableBodyRows({ rowModel, openDrawer }: Omit<UserTableProps, "headerGroups">) {
    return rowModel.rows.map((row) => (
        <Tr
            key={row.id}
            tabIndex={0}
            onClick={() => openDrawer(row.original.id)}
            onKeyDown={(e: KeyboardEvent<HTMLTableRowElement>) => {
                if (e.key === " " || e.key === "Enter" || e.key === "Space") {
                    e.preventDefault();
                    openDrawer(row.original.id);
                }
            }}
            cursor="pointer"
            _hover={{ bgColor: "body.100" }}
        >
            {row.getVisibleCells().map((cell) => (
                <Td key={cell.id} borderColor="body.100" px="3" py="5" fontSize="sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
            ))}
        </Tr>
    ));
}

function MobileTableBodyRows({ rowModel, openDrawer }: Omit<UserTableProps, "headerGroups">) {
    return rowModel.rows.map((row) => (
        <Tr
            key={row.id}
            tabIndex={0}
            onClick={() => openDrawer(row.original.id)}
            cursor="pointer"
            borderBottom="1px solid"
            borderColor="body.200"
            _hover={{ bgColor: "body.100" }}
        >
            <Td bg="white" px="4" py="5">
                <MobileUserTableCard user={row.original} />
            </Td>
        </Tr>
    ));
}

export default UserTable;
