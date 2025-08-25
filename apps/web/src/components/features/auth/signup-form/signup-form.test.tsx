import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignupForm from "./signup-form";
import { signUpAction } from "@/actions/auth.actions";
import { useRouter } from "next/navigation";

// Mock react-dom's useFormState and useFormStatus
jest.mock("react-dom", () => ({
  useFormState: jest.fn((action, initialState) => [
    initialState,
    jest.fn(), // Mock dispatch function
  ]),
  useFormStatus: jest.fn(() => ({ pending: false })),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Mock the action
jest.mock("@/actions/auth.actions", () => ({
  signUpAction: jest.fn(),
}));

describe("SignupForm component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockClear();
    (signUpAction as jest.Mock).mockClear();
  });

  it("should render without crashing", () => {
    render(<SignupForm />);
    expect(screen.getByText("Create an account")).toBeInTheDocument();
  });

  it("should display all required fields", () => {
    render(<SignupForm />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
  });

  it("should call signUpAction on form submission", async () => {
    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));

    await waitFor(() => {
      expect(signUpAction).toHaveBeenCalled();
    });
  });
});
