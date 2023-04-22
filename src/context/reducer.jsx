/** Fichero context/reducers.js */
export const LOGIN = 'LOGIN'

export const initialState = false

// Tomaremos a las acciones como en Redux, como objetos con
// las propiedaes 'type' y 'payload'.
export const reducerLogin = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return !state
		default:
			return state
	}
}
