import { useParams } from 'react-router-dom'
import './Product.page.scss'
import { useState, useEffect } from 'react'
import { GET } from '../../services/http.service'
import Card from 'react-bootstrap/Card'

export default function Product() {
	let { id } = useParams()
	const [producto, setProducto] = useState(null)
	useEffect(() => {
		GET(`https://fakestoreapi.com/products/${id}`)
			.then((data) => {
				setProducto(data)
				console.log('✅ Hemos recibido los datos correctamente: ', data)
			})
			.catch((error) => {
				console.error('❌ Algo ha ido mal con la petición...', error)
			})
	}, [])

	return (
		<>
			{producto ? (
				<div className='Product'>
					<p>{producto.category}</p>
					<img src={producto.image} width='300' />
					<p className='Titol'>{producto.title}</p>
					<p>{producto.description}</p>
					<p>{producto.price}€</p>
					<p>Rate: {producto.rating.rate}</p>
				</div>
			) : (
				<p>Cargando producto...</p>
			)}
		</>
	)
}
