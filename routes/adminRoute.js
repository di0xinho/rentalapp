const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Lista użytkowników została zwrócona pomyślnie",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Błąd podczas zwracania listy użytkowników",
      success: false,
      error,
    });
  }
});

router.post("/delete-user", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.record["_id"];
    const adminId = req.body.userId;

    if (userId === adminId) {
      res.status(200).send({
        message: "Nie możesz usunąć samego siebie z bazy danych",
        success: false,
      });
    } else {
      await User.findOneAndDelete({ _id: userId });

      res.status(200).send({
        message: "Użytkownik został usunięty z serwisu",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Usuwanie użytkownika zakończyło się niepowodzeniem",
      success: false,
      error,
    });
  }
});

router.post("/search-for-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});

    const name = req.body.values.name;
    const email = req.body.values.email;
    const firstName = req.body.values.firstName;
    const surname = req.body.values.surname;
    const phoneNumber = Number(req.body.values.phoneNumber);
    const isAdmin = Boolean(req.body.values.isAdmin);

    const filteredUsers = users.filter((user) => {
      return (
        (!name || user.name === name) &&
        (!email || user.email === email) &&
        (!firstName || user.firstName === firstName) &&
        (!surname || user.surname === surname) &&
        (!phoneNumber || user.phoneNumber === phoneNumber) &&
        (!isAdmin || user.isAdmin === isAdmin)
      );
    });

    res.status(200).send({
      message: "Lista wyszukiwanych użytkowników została zwrócona pomyślnie",
      success: true,
      data: filteredUsers,
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

module.exports = router;
