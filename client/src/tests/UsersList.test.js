import { render, screen, fireEvent, getByLabelText } from "@testing-library/react";
import UsersList from "../pages/admin/UsersList";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("UsersList Component", () => {
  it("Testowany jest przycisk do czyszczenia filtru", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UsersList />
        </BrowserRouter>
      </Provider>
    );

    const mockUser = {
        login: "janekkowalski",
        email: "jankowalski@gmail.com",
        firstName: "Jan",
        surname: "Kowalski",
        phoneNumber: "123456789",
    }

    fireEvent.change(screen.getByPlaceholderText('Wpisz login użytkownika'), { target: { value: mockUser.login } });
    fireEvent.change(screen.getByPlaceholderText('Wpisz adres email użytkownika'), { target: { value: mockUser.email } });
    fireEvent.change(screen.getByLabelText('Imię'), { target: { value: mockUser.firstName } });
    fireEvent.change(screen.getByLabelText('Nazwisko'), { target: { value: mockUser.surname } });
    fireEvent.change(screen.getByLabelText('Numer telefonu'), { target: { value: mockUser.phoneNumber } });

    fireEvent.click(screen.getByText('Wyczyść filtr'));

    expect(screen.getByPlaceholderText('Wpisz login użytkownika')).toHaveValue('');
    expect(screen.getByPlaceholderText('Wpisz adres email użytkownika')).toHaveValue('');
    expect(screen.getByLabelText('Imię')).toHaveValue('');
    expect(screen.getByLabelText('Nazwisko')).toHaveValue('');
    expect(screen.getByLabelText('Numer telefonu')).toHaveValue('');

  });
});
