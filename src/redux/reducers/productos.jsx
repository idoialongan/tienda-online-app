// REDUCERS - Las funciones que ejecutarán las instrucciones (actions)
// y que devolverán el nuevo estado modificado.
import { ACTIONS_PRODUCTOS } from '../actions'

const productos = (state = [], action) => {
	switch (action.type) {
		case ACTIONS_PRODUCTOS.CREAR:
			state = action.payload
			return [...state]
		case ACTIONS_PRODUCTOS.LOAD_PRODUCTS:
			return [...state]
		default:
			return [...state]
	}
}

export default productos
