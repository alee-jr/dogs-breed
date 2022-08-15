import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "..";
import { AuthProvider } from "src/contexts/AuthContext";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/login",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

const MakeSut = () => (
  <AuthProvider>
    <LoginForm />
  </AuthProvider>
);

describe("input behavior", () => {
  test("display error message when filled in wrong", async () => {
    render(<MakeSut />);

    const emailInput = screen.getByPlaceholderText(/Email address/i);
    const emailErrorMessage = screen.queryByText(/Invalid email format/i);

    expect(emailErrorMessage).not.toBeInTheDocument();

    // add invalid data
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "test");

    // show error message
    waitFor(() => {
      const onScreenErrorMessage = screen.getByText(/Invalid email format/i);
      expect(onScreenErrorMessage).toBeInTheDocument();
    });
  });

  test("hide error message when filled in right", async () => {
    render(<MakeSut />);

    const emailInput = screen.getByPlaceholderText(/Email address/i);
    const emailErrorMessage = screen.queryByText(/Invalid email format/i);

    expect(emailErrorMessage).not.toBeInTheDocument();

    // add invalid data
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "test");

    // show error message
    waitFor(() => {
      const onScreenErrorMessage = screen.getByText(/Invalid email format/i);
      expect(onScreenErrorMessage).toBeInTheDocument();
    });

    // clear and add valid data
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "test@mail.com");

    // hide error message
    expect(emailInput).toHaveValue("test@mail.com");
    expect(emailErrorMessage).not.toBeInTheDocument();
  });
});
