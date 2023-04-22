import './Store.page.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GET } from '../../services/http.service'
import { useSelector, useDispatch } from 'react-redux'
import { loadProducts } from '../../redux/actions'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardProduct from '../../components/CardProduct/CardProduct.component'

export default function Store({ esDeDia }) {
	//const [productos, setProductos] = useState([])
	const productos = useSelector((state) => state)
	const [dia, setDia] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		setDia(esDeDia)
	}, [esDeDia, productos])

	useEffect(() => {
		productos.length === 0 && dispatch(loadProducts())
	}, [])

	return (
		<div className='Store container mw-100'>
			{productos.length > 0 ? (
				<div className='productos container p-4'>
					<div className='row  justify-content-center gap-4'>
						{productos.map((product) => (
							<CardProduct
								key={product.id}
								dia={dia}
								product={product}
							></CardProduct>
						))}
					</div>
				</div>
			) : (
				<p>cargando productos...</p>
			)}
		</div>
	)
}
