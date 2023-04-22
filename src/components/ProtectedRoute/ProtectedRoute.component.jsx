import { useState, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Context from '../../context'

const useAuth = () => {
	//const [isLogged, setLogged] = useState(true)
	const context = useContext(Context)
	const isLogged = context.isLogged
	if (isLogged) {
		return true
	} else {
		return false
	}
}

export const ProtectedRoute = () => {
	const auth = useAuth()

	return auth ? <Outlet /> : <Navigate to='/login' />
}
