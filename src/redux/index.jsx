import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas'

import productos from './reducers/productos'

const sagaMiddleware = createSagaMiddleware()

// STORE - El estado global de la aplicación.
let store = createStore(
	productos,
	compose(
		applyMiddleware(sagaMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

// Ejecutamos el hilo de ejecución del middleware,
// sólo funcionará una vez ejecutado el método applyMiddleware
sagaMiddleware.run(rootSaga)

export default store
