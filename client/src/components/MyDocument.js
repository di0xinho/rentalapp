import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: "2.5cm",
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  signature: {
    borderTop: "1px solid black",
    marginTop: 32,
    paddingTop: 8,
    width: "50%",
  },
  newline: {
    marginTop: 8,
    marginBottom: 8,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 12,
  },
});

function boolToString(value) {
  return value ? "tak" : "nie";
}

const MyDocument = ({ bookingDetails }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.title}>Karta informacyjna</Text>
      </View>
      <View style={styles.subtitle}>
        <Text>Informacje podstawowe:</Text>
      </View>
      <View>
        <Text style={styles.text}>
          Wynajmujacy: Wypozyczalnia samochodow CarRental
        </Text>
        <Text style={styles.text}>Numer id najemcy: {bookingDetails.user}</Text>
        <Text style={styles.text}>
          Adres wypozyczalni: ul. Jana Kowalskiego 18, 87-100 Torun
        </Text>
        <Text style={styles.text}>
          Numer telefonu do wypozyczalni: 123 456 789
        </Text>
        <Text style={styles.text}>
          Adres e-mail wypozyczalni: carrentaltorun@gmail.com
        </Text>
        <Text style={styles.newline}></Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Cecha</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Wartosc</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Marka</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{bookingDetails.car["make"]}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Model</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{bookingDetails.car["model"]}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Liczba miejsc</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {bookingDetails.car["capacity"]}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Rok produkcji</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{bookingDetails.car["year"]}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Kolor</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{bookingDetails.car["color"]}</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Rodzaj karoserii</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {bookingDetails.car["bodyType"]}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Rodzaj skrzyni biegów</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {bookingDetails.car["gearboxType"]}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Przebieg</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {bookingDetails.car["mileage"]} km
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Rodzaj paliwa</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {bookingDetails.car["fuelType"]}
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Cena za godzine</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {bookingDetails.car["hourlyPrice"]} PLN
            </Text>
          </View>
        </View>
        <Text style={styles.newline}></Text>
      </View>
      <View style={styles.subtitle}>
        <Text>Informacje szczegolowe:</Text>
      </View>
      <View>
        <Text style={styles.text}>
          Data rozpoczecia wypozyczenia: {bookingDetails.bookedTimeSlots.from}
        </Text>
        <Text style={styles.text}>
          Data zakonczenia wypozyczenia: {bookingDetails.bookedTimeSlots.to}
        </Text>
        <Text style={styles.text}>
          Dlugosc wypozyczenia (w godzinach): {bookingDetails.totalHours}
        </Text>
        <Text style={styles.text}>
          Naleznosc: {bookingDetails.totalPrice} PLN
        </Text>
        <Text style={styles.text}>
          Jazda z kierowca: {boolToString(bookingDetails.driver)}
        </Text>
        <Text style={styles.text}>
          Status platnosci (czy oplacone?):{" "}
          {boolToString(bookingDetails.isPaid)}
        </Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
