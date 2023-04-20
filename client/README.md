### Aplikacja do wypożyczania samochodów ### Michał Michalski ###

Aplikacja wykorzystuje MongoDB oraz platformę do przetwarzania transakcji - Stripe.
Przed uruchomieniem aplikacji należy przygotować stosowne klucze, aby móc być w stanie ją uruchomić.
Należy przygotować: 

- adres URL bazy danych MongoDB wykorzystywanej w aplikacji

- klucz prywatny (Secret Key) do autoryzacji i wykonywania akcji na rzecz konta Stripe (tworzenie opłat)

- klucz publiczny (Publishable Key) używany do tworzenia tokenów kart płatniczych na stronie klienta

Aby uruchomić projekt, należy postąpić według następujących kroków:

1. Należy zainstalować wszystkie biblioteki użyte w projekcie w katalogu głównym projektu oraz w katalogu "/client".
W terminalu używamy komendy: "npm install".

2. Należy uzupełnić wartości w pliku .env, a konkretniej ACCESS_TOKEN_SECRET, MONGO_URL oraz REACT_APP_STRIPE_PUBLISHABLE_KEY i REACT_APP_STRIPE_SECRET_KEY.

3. W pliku "/client/src/pages/user/Booking.js" uzupełnić wartość zmiennej PublishableKey o wartość klucza uwierzytelniającego do konta na serwisie Stripe.

4. W katalogu głównym w pliku "server.js" należy uzupełnić wartość zmiennej "stripe" o wartość klucza prywatnego.

5. Kolejnym krokiem jest uruchomienie aplikacji i serwera. Serwer uruchamiamy w katalogu głównym - używamy komendy: "nodemon server.js" (alternatywnie npm start). Aplikację uruchamiamy w katalogu "/client" poleceniem "npm start".

Po wykonaniu tych pięciu kroków aplikacja powinna być gotowa do użytkowania.

###### ######################################################################## ######