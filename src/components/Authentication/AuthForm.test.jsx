import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import AuthForm from "./AuthForm";

jest.mock("axios");

describe("AuthForm Component", () => {

  test("1. Shows error when email is empty", async () => {
    render(<AuthForm />);

    const submitBtn = screen.getByText("SignUp");
    fireEvent.click(submitBtn);

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });

  test("2. Shows error when password is empty", async () => {
    render(<AuthForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByText("SignUp"));

    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });

  test("3. Shows error when confirm password is empty", async () => {
    render(<AuthForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("SignUp"));

    expect(screen.getByText("Confirm your password")).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });

  test("4. Shows mismatch error when passwords do not match", async () => {
    render(<AuthForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password456" },
    });

    fireEvent.click(screen.getByText("SignUp"));

    expect(screen.getByText("Password Mismatch")).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });

  test("5. Successful submission calls API", async () => {
    axios.post.mockResolvedValueOnce({ data: {} });
    console.log = jest.fn();  // mock console.log

    render(<AuthForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("SignUp"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    expect(console.log).toHaveBeenCalledWith("User registered successfully");
  });

  test("6. Email error should clear on typing", () => {
    render(<AuthForm />);

    fireEvent.click(screen.getByText("SignUp")); // triggers error

    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "a" } });

    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });

  test("7. Password mismatch clears on correction", () => {
    render(<AuthForm />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "abc123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "xyz999" },
    });

    fireEvent.click(screen.getByText("SignUp"));
    expect(screen.getByText("Password Mismatch")).toBeInTheDocument();

    // Fix mismatch
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "abc123" },
    });

    expect(screen.queryByText("Password Mismatch")).not.toBeInTheDocument();
  });
});
