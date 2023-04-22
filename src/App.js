import { useState, useReducer } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Context from './context'
import { reducerLogin, initialState, LOGIN } from './context/reducer'

import About from './pages/About/About.page'
import Store from './pages/Store/Store.page'
import Login from './pages/Login/Login.page'
import Product from './pages/Product/Product.page'
import Nav from './components/Nav/Nav.component'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute.component'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

function App() {
	const [isLogged, dispatch] = useReducer(reducerLogin, initialState)
	const [esDeDia, setDia] = useState(true)

	const handleDia = () => {
		setDia(!esDeDia)
	}
	let login = () => {
		dispatch({ type: LOGIN })
	}
	return (
		<Context.Provider
			value={{
				isLogged: isLogged,
				login: login,
			}}
		>
			<div className={`App${esDeDia ? ' esDeDia' : ''}`}>
				<BrowserRouter>
					<h1 className='mt-2 mb-5'>Bienvenido a mi tienda</h1>
					<strong>{process.env.REACT_APP_VARIABLE}</strong>
					<Nav esDeDia={esDeDia} handleDia={handleDia} />
					<Routes>
						<Route exact path='/login' element={<Login />} />
						<Route path='/' element={<ProtectedRoute />}>
							<Route exact path='/' element={<Store esDeDia={esDeDia} />} />
							<Route exact path='/about' element={<About />} />
							{/* podemos enviar un identificador como parámetro en la ruta */}
							<Route path='/product/:id' element={<Product />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</div>
		</Context.Provider>
	)
}

export default App
