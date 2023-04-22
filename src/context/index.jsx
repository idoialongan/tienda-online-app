import React from 'react'

// Estado inicial de la aplicación.
const initialState = {
	isLogged: false,
	login: () => {},
}

export default React.createContext(initialState)
