const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");
const app = express();

//MOTOR DE PLANTILLAS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//MIDDLEWARES

app.use(express.urlencoded({ extended: true })); //Convierte los datos del formulario en un objeto accesible desde req.body
app.use(express.static(path.join(__dirname, "public"))); //Sirve archivos estáticos como CSS desde la carpeta public

//RUTAS
app.use("/", indexRouter);

//PUERTO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
