import {
  render,
  screen,
  fireEvent,
  getByLabelText,
  getByText,
} from "@testing-library/react";
import Settings from "../pages/user/Settings";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("Settings Component", () => {
  it("Test sprawdza działanie switcha w komponencie Settings. Switch ma blokować edytowanie danych użytkownika.", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Settings />
        </BrowserRouter>
      </Provider>
    );
    
    const inputFields = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");
    const switchToggle = screen.getAllByRole("switch")[1];
    
    expect(switchToggle).toBeChecked();
    expect(button).toBeDisabled();

    expect(inputFields[0]).toHaveAttribute("disabled");
    expect(inputFields[1]).toHaveAttribute("disabled");
    expect(inputFields[3]).toHaveAttribute("disabled");
    expect(inputFields[4]).toHaveAttribute("disabled");
    expect(inputFields[5]).toHaveAttribute("disabled");

    fireEvent.click(switchToggle);

    expect(switchToggle).not.toBeChecked();
    expect(button).not.toBeDisabled();
  });
});
