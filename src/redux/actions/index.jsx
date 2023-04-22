export const ACTIONS_PRODUCTOS = {
	CREAR: 'CREAR_PRODUCTOS',
	LOAD_PRODUCTS: 'LOAD_PRODUCTS',
}
export const crearProductos = (data) => {
	return {
		type: ACTIONS_PRODUCTOS.CREAR,
		payload: data,
	}
}

export const loadProducts = () => {
	return {
		type: ACTIONS_PRODUCTOS.LOAD_PRODUCTS,
	}
}
