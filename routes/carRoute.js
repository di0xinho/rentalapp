const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/get-all-cars", authMiddleware, async (req, res) => {
  try {
    let cars = [];

    if (req.body.presentationMode === true) {
      cars = await Car.find({ isAvailable: true });
    } else {
      cars = await Car.find({});
    }

    res.status(200).send({
      message: "Lista samochodów została zwrócona pomyślnie",
      success: true,
      data: cars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Błąd podczas zwracania listy samochodów",
      success: false,
      error,
    });
  }
});

router.post("/search-for-cars", authMiddleware, async (req, res) => {
  try {
    const make = req.body.values.make;
    const model = req.body.values.model;
    const year = Number(req.body.values.year);
    const hourlyPriceFrom = req.body.values.hourlyPrice[0];
    const hourlyPriceTo = req.body.values.hourlyPrice[1];
    const color = req.body.values.color;
    const bodyType = req.body.values.bodyType;
    const gearboxType = req.body.values.gearboxType;
    const fuelType = req.body.values.fuelType;
    const capacity = Number(req.body.values.capacity);
    let isAvailable = req.body.values.isAvailable;

    if (isAvailable === undefined || isAvailable === "") {
      isAvailable = true;
    } else {
      isAvailable = Boolean(req.body.values.isAvailable);
    }

    let cars = [];

    if (req.body.adminMode === false) {
      cars = await Car.find({ isAvailable: true });
    } else {
      cars = await Car.find({ isAvailable });
    }

    const filteredCars = cars.filter((car) => {
      return (
        (!make || car.make === make) &&
        (!model || car.model === model) &&
        (!year || car.year === year) &&
        car.hourlyPrice >= hourlyPriceFrom &&
        car.hourlyPrice <= hourlyPriceTo &&
        (!color || car.color === color) &&
        (!bodyType || car.bodyType === bodyType) &&
        (!gearboxType || car.gearboxType === gearboxType) &&
        (!fuelType || car.fuelType === fuelType) &&
        (!capacity || car.capacity === capacity) &&
        (!isAvailable || car.isAvailable === isAvailable)
      );
    });

    res.status(200).send({
      message: "Lista wyszukiwanych samochodów została zwrócona pomyślnie",
      success: true,
      data: filteredCars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Błąd podczas zwracania listy wyszukiwanych samochodów",
      success: false,
      error,
    });
  }
});

router.get("/get-car-details/:carId", authMiddleware, async (req, res) => {
  try {
    const carId = req.params["carId"];

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        message: "Samochód o takim numerze id nie istnieje w bazie danych",
      });
    }

    res.status(200).send({
      message: "Lista samochodów została zwrócona pomyślnie",
      success: true,
      data: car,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Nie można zwrócić informacji o danym samochodzie" });
  }
});

router.post("/add-new-car", authMiddleware, async (req, res) => {
  try {
    const newcar = new Car(req.body.values);
    await newcar.save();

    res.status(200).send({
      message: "Dodawanie nowej oferty zakończyło się powodzeniem",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Dodawanie nowej oferty zakończyło się niepowodzeniem",
      success: false,
      error,
    });
  }
});

router.post("/edit-car/:carId", authMiddleware, async (req, res) => {
  try {
    const carId = req.params["carId"];

    const {
      make,
      model,
      capacity,
      year,
      color,
      imageUrl,
      bodyType,
      gearboxType,
      mileage,
      fuelType,
      hourlyPrice,
      isAvailable,
      description,
    } = req.body.carData;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        message: "Samochód o takim numerze id nie istnieje w bazie danych",
      });
    }

    car.make = make;
    car.model = model;
    car.capacity = capacity;
    car.year = year;
    car.color = color;
    car.bodyType = bodyType;
    car.gearboxType = gearboxType;
    car.imageUrl = imageUrl;
    car.mileage = mileage;
    car.fuelType = fuelType;
    car.hourlyPrice = hourlyPrice;
    car.description = description;
    car.isAvailable = isAvailable;

    await car.save();

    res.status(200).send({
      message: "Informacje o ofercie dla tego pojazdu zostały zaktualizowane",
      success: true,
      data: car,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Edycja oferty dla tego pojazdu nie powiodła się",
      success: false,
      error,
    });
  }
});

router.get("/delete-car/:carId", authMiddleware, async (req, res) => {
  try {
    const carId = req.params["carId"];

    await Car.findOneAndDelete({ _id: carId });

    res.status(200).send({
      message: "Oferta została usunięta z serwisu",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Usuwanie oferty dla tego pojazdu zakończyło się niepowodzeniem",
      success: false,
      error,
    });
  }
});

router.post("/add-to-favorite-cars", authMiddleware, async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.id;

    const carId = req.body.carId;

    const user = await User.findById(userId);

    if (user.favorites.includes(carId)) {
      const index = user.favorites.indexOf(carId);

      if (index !== -1) {
        user.favorites.splice(index, 1);
      }

      res.status(201).send({
        message: "Ten pojazd znajduje się już w twojej liście ulubionych",
        success: true,
      });
    } else {
      await user.favorites.push(String(carId));

      res.status(200).send({
        message: "Dodawanie pojazdu do listy ulubionych zakończone sukcesem",
        success: true,
      });
    }

    await user.save();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Nie udało się dodać pojazdu do listy ulubionych",
      success: false,
      error,
    });
  }
});

router.post("/get-favorite-cars", authMiddleware, async (req, res) => {
  try {
    let usersFavoriteCars = [req.body];

    if (usersFavoriteCars === null || usersFavoriteCars === undefined) {
      usersFavoriteCars = null;
    } else {
      usersFavoriteCars = [req.body];
    }

    const cars = await Car.find({});

    const favoriteCarIds = usersFavoriteCars
      .map((user) => user.userFavoriteCars)
      .flat();

    const favoriteCars = cars.filter((car) =>
      favoriteCarIds.includes(car._id.toString())
    );

    res.status(200).send({
      message: "Lista samochodów została zwrócona pomyślnie",
      success: true,
      data: favoriteCars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Nie udało się zwrócić listy ulubionych samochodów",
      success: false,
      error,
    });
  }
});

module.exports = router;
