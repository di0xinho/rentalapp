export function validateEmail(_, value) {
    if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Proszę wpisać poprawny adres email."));
  }

  export function validatePassword(_, value){
    if (
      !value ||
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.{8,})/.test(value)
    ) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(
        "Hasło musi mieć co najmniej 8 znaków i składać się z małych i dużych liter, cyfr oraz znaków specjalnych."
      )
    );
  };