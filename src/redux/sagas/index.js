import { fork, put, takeLatest, call } from '@redux-saga/core/effects'
import { ACTIONS_PRODUCTOS } from '../actions'
import { crearProductos } from '../actions'
import { GET } from '../../services/http.service'

export function* rootSaga() {
	yield fork(productSaga)
}

// El saga quedará a la escucha de la ultima acción ejecutada
// del tipo LOAD_PROODUCTS, gracias al método takeLatest, y ejecutará
// la función indicada como segundo argumento cuando detecte esa acción.
function* productSaga() {
	yield takeLatest(ACTIONS_PRODUCTOS.LOAD_PRODUCTS, loadProducts)
}

// También como generadora, esta función obtendrá el listado de productos
// utilizando axios, y luego lanzará una nueva acción para actualizar el
// listado, en lugar de con dispatch, utilizando el método propio put.
function* loadProducts() {
	console.log('loadProducts saga')
	const products = yield call(() => GET('products/'))
	yield put(crearProductos(products))
}
