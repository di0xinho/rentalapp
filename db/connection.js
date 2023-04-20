const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

// Zdarzenie zostanie wywołane tylko raz
connection.once("connected", () => {
    console.log("Połączono się z bazą MongoDB")
});

// Kiedy będzie brak połączenia z bazą zdarzenie będzie wywoływane za każdym razem
connection.on("error", (error) =>{
    console.log("Nie udało się połączyć z bazą MongoDB", error);
});

module.exports = mongoose;