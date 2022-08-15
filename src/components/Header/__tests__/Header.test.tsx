import { render, screen } from "@testing-library/react";
import { Header } from "..";
import { AuthProvider } from "src/contexts/AuthContext";

const MakeSut = () => (
  <AuthProvider>
    <Header />
  </AuthProvider>
);

describe("Header component", () => {
  test("should test header title and button", async () => {
    render(<MakeSut />);
    const title = screen.queryByText(/Dogs Breeds/i);
    const signOutButton = screen.queryByText(/Sign out/i);
    expect(title).toBeInTheDocument();
    expect(signOutButton).toBeInTheDocument();
  });
});
