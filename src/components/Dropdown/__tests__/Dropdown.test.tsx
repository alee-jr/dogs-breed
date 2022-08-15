import { render, screen } from "@testing-library/react";
import { Dropdown } from "..";
import { AuthProvider } from "src/contexts/AuthContext";
import { DropdownProps, TList } from "../types";

const breeds = [
  { id: 1, name: "chihuahua" },
  { id: 2, name: "husky" },
  { id: 3, name: "labrador" },
  { id: 4, name: "pug" },
];

const MakeSut = ({ list, onChange, selected }: DropdownProps) => (
  <AuthProvider>
    <Dropdown list={list} onChange={onChange} selected={selected} />
  </AuthProvider>
);

describe("dropdown behavior", () => {
  test("should select a value", async () => {
    const setValue = (value: TList) => value;
    render(<MakeSut list={breeds} onChange={setValue} selected={breeds[1]} />);
    const selectedName = screen.queryByText(/husky/i);
    expect(selectedName).toBeInTheDocument();
  });
});
