import { Formik } from 'formik'
import * as Yup from 'yup'
import './LoginForm.component.scss'
//import { useSelector, useDispatch } from 'react-redux'
//import { handleLoggin } from '../../redux/actions'
import { useState, useEffect, useContext } from 'react'
import Context from '../../context'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function MensajesHeader(props) {
	const [userLogged, setuserLogged] = useState('')
	const [registerState, setregisterState] = useState('')
	const [logginState, setlogginState] = useState('')

	const navigate = useNavigate()

	//const isLogged = useSelector((state) => state.isLogged)
	const context = useContext(Context)
	const isLogged = context.isLogged
	//const dispatch = useDispatch()
	// let userloggin = (user) => {
	// 	dispatch(handleLoggin())
	// }
	const registrarUsuario = (values) => {
		// Parse any JSON previously stored in usuarios_registrados
		var usuariosRegistrados = JSON.parse(
			localStorage.getItem('usuarios_registrados')
		)
		if (usuariosRegistrados == null) usuariosRegistrados = []

		// Push new user if it doesn't already exist and save usuarios_registrados back to local storage
		let usuari = usuariosRegistrados.find(({ email }) => email === values.email)
		!usuari
			? usuariosRegistrados.push(values)
			: setregisterState('Este email ya está registrado')
		localStorage.setItem(
			'usuarios_registrados',
			JSON.stringify(usuariosRegistrados)
		)
	}
	const loginUsuario = (values, context) => {
		let usuariosregistrados = JSON.parse(
			// Reconvertimos el objeto JSON en un objeto JavaScript
			localStorage.getItem('usuarios_registrados') // Buscamos el valor almacenado en dicha clave
		)
		let usuari = usuariosregistrados.find(({ email }) => email === values.email)
		if (usuari && usuari.password === values.password) {
			//userloggin(values.email)
			context.login()
			setuserLogged(values.email)
			localStorage.setItem('userLogged', JSON.stringify(values.email))
			navigate('/')
		} else {
			setlogginState('Usuario o password incorrecto')
		}
	}

	const cerrar_sesion = (context) => {
		localStorage.setItem('userLogged', JSON.stringify(''))
		context.login()
		//userloggin()
	}

	const validaciones = Yup.object().shape({
		email: Yup.string().email().required('Por favor, escribe una email.'),
		password: Yup.string()
			.required('Por favor, escribe un password')
			.min(8, 'Mínimos 8 carácteres.'),
	})

	let initialValues = { email: '', password: '' }

	useEffect(() => {
		var usuariologged = JSON.parse(localStorage.getItem('userLogged'))
		setuserLogged(usuariologged)
	}, [])

	return (
		<Context.Consumer>
			{(context) => (
				<>
					{!isLogged ? (
						<div className='formularios_login'>
							{/**LOGIn**/}
							<div className='login'>
								<Formik
									validationSchema={validaciones}
									initialValues={initialValues}
									onSubmit={async (values, actions) => {
										loginUsuario(values, context)
										await new Promise((r) => setTimeout(r, 500))
										actions.setSubmitting(false)
									}}
								>
									{({
										values,
										handleChange,
										handleSubmit,
										isSubmitting,
										errors,
									}) => (
										<div className='form'>
											<span>Login</span>
											<Form onSubmit={handleSubmit}>
												<Form.Group className='mb-3' controlId='formBasicEmail'>
													<Form.Label>Email address</Form.Label>
													<Form.Control
														type='email'
														placeholder='Enter email'
														name='email'
														onChange={handleChange}
														value={values.email}
													/>
													{errors.email ? (
														<Form.Text className='text-warning'>
															{errors.email}
														</Form.Text>
													) : null}
												</Form.Group>

												<Form.Group
													className='mb-3'
													controlId='formBasicPassword'
												>
													<Form.Label>Password</Form.Label>
													<Form.Control
														type='password'
														placeholder='Password'
														name='password'
														onChange={handleChange}
														value={values.password}
													/>
													{errors.password ? (
														<Form.Text className='text-warning'>
															{errors.password}
														</Form.Text>
													) : null}
												</Form.Group>
												{logginState !== '' ? (
													<Form.Text className='text-danger d-block mb-3'>
														{logginState}
													</Form.Text>
												) : (
													''
												)}
												<Button
													variant='primary'
													type='submit'
													disabled={isSubmitting}
												>
													Enviar
												</Button>
											</Form>
										</div>
									)}
								</Formik>
							</div>
							{/**REGISTRO */}
							<div className='login'>
								<Formik
									validationSchema={validaciones}
									initialValues={initialValues}
									onSubmit={async (values, actions) => {
										registrarUsuario(values)
										await new Promise((r) => setTimeout(r, 500))
										actions.setSubmitting(false)
									}}
								>
									{({
										values,
										handleChange,
										handleSubmit,
										isSubmitting,
										errors,
									}) => (
										<div className='form'>
											<Form onSubmit={handleSubmit}>
												<span>Registro</span>
												<Form.Group className='mb-3' controlId='formBasicEmail'>
													<Form.Label>Email address</Form.Label>
													<Form.Control
														type='email'
														placeholder='Enter email'
														name='email'
														onChange={handleChange}
														value={values.email}
													/>
													{errors.email ? (
														<Form.Text className='text-warning'>
															{errors.email}
														</Form.Text>
													) : null}
												</Form.Group>

												<Form.Group
													className='mb-3'
													controlId='formBasicPassword'
												>
													<Form.Label>Password</Form.Label>
													<Form.Control
														type='password'
														placeholder='Password'
														name='password'
														onChange={handleChange}
														value={values.password}
													/>
													{errors.password ? (
														<Form.Text className='text-warning'>
															{errors.password}
														</Form.Text>
													) : null}
												</Form.Group>
												{registerState !== '' ? (
													<Form.Text className='text-danger d-block mb-3'>
														{registerState}
													</Form.Text>
												) : (
													''
												)}
												<Button
													variant='primary'
													type='submit'
													disabled={isSubmitting}
												>
													Enviar
												</Button>
											</Form>
										</div>
									)}
								</Formik>
							</div>
						</div>
					) : (
						<div className='session'>
							<p>Hola, {userLogged}</p>
							<button
								className='btn btn-primary'
								onClick={() => cerrar_sesion(context)}
							>
								Cerrar sesión
							</button>
						</div>
					)}
				</>
			)}
		</Context.Consumer>
	)
}
