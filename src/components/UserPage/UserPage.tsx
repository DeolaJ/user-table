import UserList from "../UserList";

import Message from "../shared/Message";
import Loader from "../shared/Loader";
import OutlineButton from "../shared/OutlineButton";

import useUsers from "../../hooks/useUsers";

function UsersPage() {
    const { data: users, isLoading: isLoadingUsers, error, refetch } = useUsers();

    if (isLoadingUsers) {
        return <Loader />;
    }

    if (error) {
        return (
            <Message
                description="An error occurred while loading users"
                helpText="Please reload or try again later"
            >
                <OutlineButton onClick={() => refetch()} mt="4">
                    Retry
                </OutlineButton>
            </Message>
        );
    }

    if (!users) {
        return (
            <Message description="There are no users" helpText="Please reload or try again later">
                <OutlineButton onClick={() => refetch()} mt="4">
                    Retry
                </OutlineButton>
            </Message>
        );
    }

    return <UserList users={users} />;
}

export default UsersPage;
