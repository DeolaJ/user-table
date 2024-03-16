import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
} from "@chakra-ui/react";

import UserDetails from "./UserDetails";

import { User } from "../../types";

type UserDrawerProps = {
    onClose: () => void;
    isOpen: boolean;
    userId: number;
    users: User[];
};

function UserDrawer({ isOpen, onClose, userId, users }: UserDrawerProps) {
    const user = users?.find(({ id }) => id === userId);

    return (
        <Drawer size="md" isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton color="body.500" />

                <DrawerHeader>User Details</DrawerHeader>
                <DrawerBody>
                    <UserDetails user={user} />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}

export default UserDrawer;
