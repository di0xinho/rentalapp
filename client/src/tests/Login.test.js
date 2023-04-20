import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("Login Component", () => {
  it("Komponent jest sprawdzany, czy posiada switch do zmiany trybu na ciemny oraz czy po zmianie stanu switcha z niezaznaczonego na zaznaczony, zmienia się właściwość isDarkMode", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const switchComponent = screen.getByRole("switch");

    expect(switchComponent).toBeInTheDocument();

    expect(switchComponent).not.toHaveAttribute("checked");

    fireEvent.click(switchComponent);

    expect(store.getState().theme.isDarkMode).toBe(true);
    expect(switchComponent).toBeChecked();
  });
});
