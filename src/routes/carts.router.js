// Express
import { Router } from "express";
const carts = Router();

// Carts manager
import CartsManager from "../managers/carts.manager.js";
const cartsManager = new CartsManager("carts");

// Endpoint para agregar un carrito:
carts.post("/", async (req, res) => {
	try {
		const postResponse = cartsManager.addCart();
		return res.status(200).send(postResponse);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

// Endpoint para buscar un carrito por ID:
carts.get("/:cid", async (req, res) => {
	try {
		// Tomar ID, convertirlo en entero y buscar carrito:
		const { cid } = req.params;
		const cartId = parseInt(cid);

		// Obtener y devolver carrito actualizado:
		const cart = await cartsManager.getCartById(cartId);
		return res.status(200).json(cart);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

// Endpoint para agregar un producto a un carrito:
carts.post("/:cid/product/:pid", async (req, res) => {
	try {
		// Tomar IDs, convertirlos en entero y agregar producto al carrito:
		const { cid, pid } = req.params;
		const cartId = parseInt(cid);
		const productId = parseInt(pid);
		cartsManager.addProductToCart(cartId, productId);

		// Obtener y devolver carrito actualizado:
		const cart = await cartsManager.getCartById(cartId);
		return res.status(200).json(cart);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

// Endpoint para borrar un carrito:
carts.delete("/:cid", async (req, res) => {
	try {
		// Tomar ID, convertirlos en entero y borrar carrito:
		const { cid } = req.params;
		const cartId = parseInt(cid);
		
		const deleteResponse = cartsManager.deleteCart(cartId);
		return res.status(200).send(deleteResponse);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

export default carts;
