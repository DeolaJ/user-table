import { render, screen } from "../utils/test-utils";
import { axe, toHaveNoViolations } from "jest-axe";

import UserDetails from "./UserDetails";

import usersMock from "../mocks/users";

expect.extend(toHaveNoViolations);

const mockedUser = usersMock[0];

describe("UserDetails", () => {
    test("should not have basic accessibility issues", async () => {
        const { container } = render(<UserDetails user={mockedUser} />);

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    test("should display the correct elements", async () => {
        render(<UserDetails user={mockedUser} />);

        // Check that the user information exists
        expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
        expect(screen.getByText("Bret")).toBeInTheDocument();
        expect(screen.getByText("Sincere@april.biz")).toBeInTheDocument();
        expect(screen.getByText("1-770-736-8031 x56442")).toBeInTheDocument();
        expect(screen.getByText("Kulas Light")).toBeInTheDocument();
        expect(screen.getByText("hildegard.org")).toBeInTheDocument();
        expect(screen.getByText("Romaguera-Crona")).toBeInTheDocument();
    });
});
