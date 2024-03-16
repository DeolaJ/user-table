import { useQuery } from "@tanstack/react-query";

import { User } from "../types";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const USERS_BASE_URL = `${API_BASE_URL}/users`;

async function fetchUsers(): Promise<User[]> {
    const response = await fetch(USERS_BASE_URL);
    if (!response.ok) {
        throw new Error(response.statusText || "Error occurred while fetching users");
    }
    const users = await response.json();
    return users;
}

export default function useUsers() {
    return useQuery<User[], Error>({
        queryKey: ["users"],
        queryFn: () => fetchUsers(),
    });
}
