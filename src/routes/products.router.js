// Express
import { Router } from "express";
const products = Router();

// Product manager
import ProductsManager from "../managers/products.manager.js";
const productsManager = new ProductsManager("products");

// Endpoint para mostrar los productos con query de límite:
products.get("/", async (req, res) => {
	try {
		const { limit } = req.query;
		const products = await productsManager.getProducts();
		if (limit) {
			// Limitar y devolver array:
			const limitedProducts = products.slice(0, limit);
			return res.status(200).json(limitedProducts);
		};
		// Devolver array completo
		return res.status(200).json(products);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

// Endpoint para mostrar un producto según ID:
products.get("/:pid", async (req, res) => {
	try {
		// Tomar ID, convertirlo en número entero, buscar el producto y devolverlo:
		const { pid } = req.params;
		const productId = parseInt(pid);
		const product = await productsManager.getProductById(productId);
		return res.status(200).json(product);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

// Endpoint para agregar un producto:
products.post("/", async (req, res) => {
	try {
		// Tomar body y agregar el producto:
		const newProduct = req.body;
		const postResponse = productsManager.addProduct(newProduct);

		// Obtener y devolver array actualizado:
		return res.status(200).json(postResponse);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

// Endpoint para actualizar un producto:
products.put("/:pid", async (req, res) => {
	try {
		// Tomar ID, onvertirlo en número entero y actualizar producto:
		const { pid } = req.params;
		const productId = parseInt(pid);
		const updatedFields = req.body;
		const putResponse = productsManager.updateProduct(productId, updatedFields);

		// Obtener y devolver array actualizado:
		return res.status(200).json(putResponse);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

// Endpoint para eliminar un producto:
products.delete("/:pid", async (req, res) => {
	try {
		// Tomar ID, convertirlo en número entero y borrar producto:
		const { pid } = req.params;
		const productId = parseInt(pid);
		const deleteResponse = productsManager.deleteProduct(productId);

		// Obtener y devolver array actualizado:
		return res.status(200).json(deleteResponse);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	};
});

export default products;