import { validatePassword } from "../utils/ValidationFunctions";

describe("Testowanie funkcji walidacyjnych", () => {
  it("Testowanie sytuacji, gdy podane hasło spełnia oczekiwane warunki", () => {
    const validPassword = "Tojesthaslo12345@";

    expect(validatePassword(null, validPassword)).resolves.toBeUndefined();
  });

  it("Testowanie sytuacji, gdy podane przez użytkownika hasło nie spełnia oczekiwanych warunków", () => {
    const invalidPassword = "invalid_password";
    const errorMessage =
      "Hasło musi mieć co najmniej 8 znaków i składać się z małych i dużych liter, cyfr oraz znaków specjalnych.";

    expect(validatePassword(null, invalidPassword)).rejects.toThrow(
      errorMessage
    );
  });

  it("Testowanie sytuacji, gdy podane przez użytkownika hasło nie spełnia oczekiwanych warunków", () => {
    const invalidPassword = "Nextinvalid_password";
    const errorMessage =
      "Hasło musi mieć co najmniej 8 znaków i składać się z małych i dużych liter, cyfr oraz znaków specjalnych.";

    expect(validatePassword(null, invalidPassword)).rejects.toThrow(
      errorMessage
    );
  });

  it("Testowanie sytuacji, gdy do Inputu podawane jest puste hasło", () => {
    const emptyPassword = "";

    expect(validatePassword(null, emptyPassword)).resolves.toBeUndefined();
  });
});
