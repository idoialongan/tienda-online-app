import { memo, useCallback } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const CardProduct = ({ dia, product }) => {
	const navigate = useNavigate()
	let abrirProducto = useCallback(
		(id) => {
			navigate('/product/' + id, {
				state: {
					id: id,
				},
			})
		},
		[product]
	)
	return (
		<Card
			bg={dia ? 'light' : 'dark'}
			key={product.id}
			style={{ width: '18rem', padding: '0px' }}
			onClick={() => abrirProducto(product.id)}
		>
			<Card.Header as='h6'>{product.category}</Card.Header>
			<Card.Img variant='top' src={product.image} width='200' />
			<Card.Body>
				<Card.Title>{product.title}</Card.Title>
				<Card.Text>{product.price}€</Card.Text>
				<Button variant='primary' onClick={() => abrirProducto(product.id)}>
					Ir al producto
				</Button>
			</Card.Body>
		</Card>
	)
}

export default memo(CardProduct)
