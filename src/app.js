// Express
import express from "express";
const app = express();
const port = 8080;

// Rutas
import productsRoute from "./routes/products.router.js";
import cartsRoute from "./routes/carts.router.js";
import viewsRoute from "./routes/views.router.js";

// Data
import products from "./data/products.json" assert { type: "json" };

// Socket
import { Server } from "socket.io";

// Handlebars
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);
app.use("/", viewsRoute);

// Server en 8080
const httpServer = app.listen(port, () => {
	console.log(`Servidor escuchando http://localhost:${port}`);
});

// Escuchar server
const io = new Server(httpServer);
io.on("connection", (socket) => {
	console.log("Nuevo cliente conectado");
	
	// Enviar productos
	socket.emit("products", products);
	
	socket.on("disconnect", () => {
		console.log("Cliente desconectado");
	});
});
