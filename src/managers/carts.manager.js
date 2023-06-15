import fs from "fs";

export default class CartsManager {
	#carts;
	#path;

	constructor(fileName) {
		this.#carts = [];
		this.#path = `./src/data/${fileName}.json`;
	};

	getCarts() {
		// Validar si existe el archivo:
		if (!fs.existsSync(this.#path)) {
			try {
				// Si no existe, crearlo:
				fs.writeFileSync(this.#path, JSON.stringify(this.#carts));
			} catch (err) {
				return `Error de escritura al obtener carritos: ${err}`;
			};
		};

		// Leer archivo y convertirlo en objeto:
		try {
			const data = fs.readFileSync(this.#path, "utf8");
			const dataArray = JSON.parse(data);
			return dataArray;
		} catch (err) {
			return `Error de lectura al obtener carritos: ${err}`;
		};
	};

	lastId() {
		const carts = this.getCarts();

		// Obtener y devolver último ID:
		if (carts.length > 0) {
			const lastId = carts.reduce((maxId, cart) => {
				return cart.id > maxId ? cart.id : maxId;
			}, 0);
			return lastId;
		};

		// Si el array está vacío, devolver 0:
		return 0;
	};

	addCart() {
		try {
			const carts = this.getCarts();
			const id = this.lastId() + 1;
			const newCart = {
				id: id,
				products: []
			};

			// Agregar carrito y escribir el archivo:
			carts.push(newCart);
			fs.writeFileSync(this.#path, JSON.stringify(carts));
			return `Cart added with ID ${id}`;
		} catch (err) {
			return `Error de escritura al agregar el carrito: ${err}`;
		};
	};

	getCartById(id) {
		try {
			const carts = this.getCarts();
			const cart = carts.find(cart => cart.id === id);
	
			// Validar si el carrito existe:
			if (!cart) {
				return `No hay carrito con ID ${id}`;
			};
			return cart.products;
		} catch (err) {
			return `Error de lectura al recibir el carrito ${id}: ${err}`;
		};
	};

	addProductToCart(cartId, productId) {
		try {
			const carts = this.getCarts();
			const cart = carts.find(cart => cart.id === cartId);
			const product = cart.products.find(product => product.product === productId);

			// Validar si el producto ya está agregado:
			if (product) {
				product.quantity += 1;
			} else {
				// Si no, agregarlo:
				const newProduct = {
					product: productId,
					quantity: 1,
				};
				cart.products.push(newProduct);
			};
			fs.writeFileSync(this.#path, JSON.stringify(carts));
			return `Prducto ${productId} agregado al carrito ${cartId}`;
		} catch (err) {
			return `Error de escritura al agregar el producto ${productId} al carrito ${cartId}: ${err}`;
		};
	};

	deleteCart(id) {
		try {
			const carts = this.getCarts();
			const cart = carts.find(cart => cart.id === id);

			// Validar ID:
			if (!cart) {
				return `No hay carrito con ID ${id}`;
			};

			// Si es correcto, borrar carrito y escribir el archivo:
			cart.products = [];
			fs.writeFileSync(this.#path, JSON.stringify(carts));
			return `Carrito ${id} borrado`;
		} catch (err) {
			return `Error de escritura al eliminar el carrito ${id}: ${err}`;
		};
	};
};