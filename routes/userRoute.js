const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(200).send({
        message: "Użytkownik o podanym adresie email już istnieje",
        success: false,
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "Tworzenie konta przebiegło pomyślnie", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Błąd podczas tworzenie konta", success: false, error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(200)
        .send({ message: "Podany użytkownik nie istnieje", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Hasło jest niepoprawne", success: false });
    } else {
      const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).send({
        message: "Logowanie przebiegło pomyślnie",
        success: true,
        data: token,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Błąd podczas logowania", success: false, error });
  }
});

router.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Wylogowywanie z tego konta jest nieosiągalne");
      } else {
        res.send("Wylogowywanie zakończono sukcesem");
      }
    });
  } else {
    res.end();
  }
});

router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;

    if (!user) {
      return res.status(200).send({
        message: "Użytkownik o takim numerze Id nie istnieje",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Nie udało się pobrać danych użytkownika",
      success: false,
      error,
    });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(200)
        .send({ message: "Podany użytkownik nie istnieje", success: false });
    }

    const secret = process.env.ACCESS_TOKEN_SECRET + user.password;

    const payload = {
      email: user.email,
      id: user.id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "15m" });

    await user.updateOne({ resetPasswordToken: token });

    const resetPasswordLink = `http://localhost:3000/resetpassword/${token}`;

    console.log("\nLink resetujący hasło: \n");
    console.log(resetPasswordLink);

    res.status(200).send({
      message:
        "Link resetujący hasło został do Ciebie wysłany. Czekamy na jego potwierdzenie. Link ten wygasa po upływie 15 minut.",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Nie można skorzystać z tej funkcji",
      success: false,
      error,
    });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
    });

    if (!user) {
      return res.status(200).send({
        message: "Link jest niepoprawny lub wygasł. Spróbuj wygenerować nowy.",
        success: false,
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    user.password = req.body.password;
    user.resetPasswordToken = undefined;

    await user.save();

    res.status(200).send({
      message: "Hasło zostało zresetowane pomyślnie.",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Nie można zresetować hasła",
      success: false,
      error,
    });
  }
});

router.get("/get-userId", authMiddleware, async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Podany użytkownik nie istnieje" });
    }

    let userRole = null;

    if (user.isAdmin === true) {
      userRole = "Administrator";
    } else {
      userRole = "Użytkownik";
    }

    res.status(200).send({
      message: "Informacje o użytkowniku zostały zwrócone poprawnie",
      success: true,
      data: { userId, userRole },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Nie można zwrócić numeru Id użytkownika" });
  }
});

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Podany użytkownik nie istnieje" });
    }

    res.status(200).send({
      message: "Informacje o użytkowniku zostały zwrócone poprawnie",
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Nie można zwrócić informacji o użytkowniku" });
  }
});

router.post("/update/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, surname, phoneNumber, dateOfBirth, sex } =
      req.body.values;

    const user = await User.findById(userId);

    user.firstName = firstName;
    user.surname = surname;
    user.phoneNumber = phoneNumber;
    user.dateOfBirth = dateOfBirth;
    user.sex = sex;

    await user.save();

    res.status(200).send({
      message: "Informacje o użytkowniku zostały zaktualizowane",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Błąd podczas aktualizacji danych profilowych",
      success: false,
      error,
    });
  }
});

module.exports = router;
