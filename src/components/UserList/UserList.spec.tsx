import { render, screen, waitFor } from "../utils/test-utils";
import { axe, toHaveNoViolations } from "jest-axe";
import userEvent from "@testing-library/user-event";

import UserList from ".";

import usersMock from "../mocks/users";

expect.extend(toHaveNoViolations);

const mockedUsers = usersMock;

describe("UserList", () => {
    test("should not have basic accessibility issues", async () => {
        const { container } = render(<UserList users={mockedUsers} />);

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("should display the correct elements", async () => {
        render(<UserList users={mockedUsers} />);

        // Check if the users length is visible
        expect(screen.getByText(/7 users/i)).toBeInTheDocument();

        // Check if the input field is visible
        expect(screen.getByLabelText(/Search/i)).toBeInTheDocument();

        // Check if the table and table rows exist
        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getAllByRole("row").length).toBe(5);

        // Check if the select exists
        expect(screen.getByLabelText("Select page size")).toBeInTheDocument();

        // Check if buttons exist
        expect(screen.getAllByRole("button").length).toBe(2);
        expect(screen.getByText("Previous")).toBeInTheDocument();
        expect(screen.getByText("Next")).toBeInTheDocument();
        expect(screen.getByLabelText("Previous")).toBeDisabled();
        expect(screen.getByLabelText("Next")).not.toBeDisabled();

        // Check that the user information exists
        expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
        expect(screen.getByText("Bret")).toBeInTheDocument();
        expect(screen.getByText("Sincere@april.biz")).toBeInTheDocument();
        expect(screen.getByText("1-770-736-8031 x56442")).toBeInTheDocument();
    });

    test("should update table rows length when page size is changed", async () => {
        render(<UserList users={mockedUsers} />);

        const selectElement = screen.getByRole("combobox");

        // Select 10 as the page size
        await userEvent.selectOptions(selectElement, "10");
        expect(selectElement).toHaveValue("10");
        expect(screen.getAllByRole("row").length).toBe(7);

        // Select 5 as the page size once again
        await userEvent.selectOptions(selectElement, "5");
        expect(selectElement).toHaveValue("5");
        expect(screen.getAllByRole("row").length).toBe(5);
    });

    test("should change page when navigation buttons are clicked", async () => {
        render(<UserList users={mockedUsers} />);

        expect(screen.getAllByRole("row").length).toBe(5);
        expect(screen.getByLabelText("Previous")).toBeDisabled();

        // Go to next page
        await userEvent.click(screen.getByLabelText("Next"));
        expect(screen.getAllByRole("row").length).toBe(2);
        expect(screen.getByLabelText("Next")).toBeDisabled();

        // Go back to previous page
        await userEvent.click(screen.getByLabelText("Previous"));
        expect(screen.getByLabelText("Previous")).toBeDisabled();
        expect(screen.getAllByRole("row").length).toBe(5);
    });

    test("should trigger filtering when the searching occurs", async () => {
        render(<UserList users={mockedUsers} />);

        expect(screen.getAllByRole("row").length).toBe(5);

        const inputElement = screen.getByLabelText(/Search/i);

        // Searching users
        await userEvent.type(inputElement, "re");

        await waitFor(() => {
            expect(inputElement).toHaveValue("re");
            expect(screen.getAllByRole("row").length).toBe(2);
        });

        // Searching users without results
        await userEvent.type(inputElement, "dfeo");

        await waitFor(() => {
            expect(screen.queryByRole("table")).not.toBeInTheDocument();
            expect(screen.getByText("Clear filter")).toBeInTheDocument();
        });

        // Clicking the clear filter button resets the table state
        await userEvent.click(screen.getByText("Clear filter"));

        await waitFor(() => {
            expect(screen.getByRole("table")).toBeInTheDocument();
            expect(screen.getAllByRole("row").length).toBe(5);
        });
    });

    test("should open drawer with corresponding user information when a row is clicked", async () => {
        render(<UserList users={mockedUsers} />);

        const rows = screen.getAllByRole("row");
        const thirdRow = rows[2];

        // Open drawer
        await userEvent.click(thirdRow);

        // Check for corresponding user information
        expect(screen.getByText("Douglas Extension")).toBeInTheDocument();
        expect(screen.getByText("ramiro.info")).toBeInTheDocument();
        expect(screen.getByText("Romaguera-Jacobson")).toBeInTheDocument();

        // Close drawer
        await userEvent.click(screen.getByLabelText("Close"));

        await waitFor(() => {
            // Check that corresponding user information has been removed
            expect(screen.queryByText("Douglas Extension")).not.toBeInTheDocument();
            expect(screen.queryByText("ramiro.info")).not.toBeInTheDocument();
            expect(screen.queryByText("Romaguera-Jacobson")).not.toBeInTheDocument();
        });

        // Open new drawer
        const secondRow = rows[1];
        await userEvent.click(secondRow);

        // Check for corresponding new user information
        expect(screen.getByText("Victor Plains")).toBeInTheDocument();
        expect(screen.getByText("anastasia.net")).toBeInTheDocument();
        expect(screen.getByText("Deckow-Crist")).toBeInTheDocument();
    });
});
