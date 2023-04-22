import './Nav.component.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faStore,
	faAddressCard,
	faUser,
	faMoon,
	faSun,
} from '@fortawesome/free-solid-svg-icons'

export default function Nav({ esDeDia, handleDia }) {
	return (
		<div className='Nav row align-items-center p-2 border-bottom border-primary'>
			<Link className='Nav-link col-sm' to='/'>
				<FontAwesomeIcon icon={faStore} />
				<span className='ml-1'>Store</span>
			</Link>
			<Link className='Nav-link col-sm' to='/about'>
				<FontAwesomeIcon icon={faAddressCard} />
				<span>About</span>
			</Link>
			<Link className='Nav-link col-sm' to='/login'>
				<FontAwesomeIcon icon={faUser} />
				<span>Login</span>
			</Link>
			<button className='btn btn-primary col-auto' onClick={handleDia}>
				{esDeDia ? (
					<FontAwesomeIcon icon={faMoon} />
				) : (
					<FontAwesomeIcon icon={faSun} />
				)}
			</button>
		</div>
	)
}
