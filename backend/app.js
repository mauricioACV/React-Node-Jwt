const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors());

const TOKEN_KEY = "x4TvnErxRETbVcqaLl5dqMI115eNlp5y";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(authHeader);
  if (token === null) {
    return res.status(401).send("Token is required");
  }
  jwt.verify(token, TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).send("token required");
    console.log(user);
    req.user = user;
    next();
  });
};

app.post("/user/login", (req, res) => {
  const user = req.body.user;
  const password = req.body.password;
  if (user === "mcampusano" && password === "1234") {
    const datos = {
      id: "123",
      name: "Mauricio Campusano",
      email: "mcampusano@mail.com",
      code: "ABCDE456-LK",
    };
    const token = jwt.sign(
      {
        userId: datos.id,
        email: datos.email,
      },
      TOKEN_KEY,
      { expiresIn: "2h" }
    );
    const nDatos = { ...datos, token };
    res.status(200).json(nDatos);
  } else {
    res.status(400).send("bad request");
  }
});

app.get("/user/:id/ventas", verifyToken, (req, res) => {
  const datos = [
    { id: 1, clinete: "Empresa A", total: 2500, fecha: "2022,01,15" },
    { id: 2, clinete: "Empresa B", total: 1500, fecha: "2022,02,25" },
    { id: 3, clinete: "Empresa C", total: 5000, fecha: "2022,03,05" },
    { id: 4, clinete: "Empresa D", total: 4500, fecha: "2022,04,23" },
    { id: 5, clinete: "Empresa E", total: 3500, fecha: "2022,05,30" },
  ];
  res.json(datos);
});

app.listen(3001, () => {
  console.log("Server is ready!");
});
