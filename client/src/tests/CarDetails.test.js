import React from "react";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import CarDetails from "../pages/user/CarDetails";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store";

describe("CarDetails Component", () => {
  it("Sprawdzana jest sytuacja, w której użytkownik po naciśnięciu przycisku 'Wypożycz już teraz' oczekuje na pojawienie się dwóch kafelek do wyboru sposobu płatności", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CarDetails />
        </BrowserRouter>
      </Provider>
    );

    const button = screen.getByRole("button", { name: "Wypożycz już teraz" });
    fireEvent.click(button);

    const cardPaymentOption = await screen.findByText("Zapłać kartą");
    const onsitePaymentOption = await screen.findByText("Zapłać na miejscu");

    expect(cardPaymentOption).toBeInTheDocument();
    expect(onsitePaymentOption).toBeInTheDocument();
  });
});
