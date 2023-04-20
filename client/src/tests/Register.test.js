import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import Register from "../pages/Register";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("Register Component", () => {
  it("Testowanie procesu rejestracji - uzupełnianie formularza przykładowymi danymi, a następnie naciśnięcie przycisku 'Załóż konto' ", async () => {
    act(() => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <Register />
          </BrowserRouter>
        </Provider>
      );
    });

    const mockUser = {
      name: "janekkowalski",
      email: "jankowalski@gmail.com",
      password: "LubiePlacki123*",
      confirm: "LubiePlacki123*",
    };

    waitFor(() =>
      fireEvent.change(screen.getByPlaceholderText("Login"), {
        target: { value: mockUser.name },
      })
    );

    waitFor(() =>
      fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: { value: mockUser.email },
      })
    );

    waitFor(() =>
      fireEvent.change(screen.getByLabelText("Hasło"), {
        target: { value: mockUser.password },
      })
    );

    waitFor(() =>
      fireEvent.change(screen.getByLabelText("Powtórz hasło"), {
        target: { value: mockUser.confirm },
      })
    );

    fireEvent.click(screen.getByText("Załóż konto"));
  });
});
