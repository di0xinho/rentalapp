import {render} from "@testing-library/react";
import LandingPage from "../pages/LandingPage";
import { BrowserRouter } from "react-router-dom";

describe("LandingPage component", () => {
    it("Komponent powinien wyświetlać tekst zawarty w stopce 'Aplikacja zrealizowana w ramach...' ", () => {
      const { getByText } = render(<BrowserRouter><LandingPage /></BrowserRouter>);
      const footerText = getByText("Aplikacja zrealizowana w ramach pracy inżynierskiej przez Michała Michalskiego - studenta 4-tego roku informatyki inż.");
      expect(footerText).toBeInTheDocument();
    });
  });