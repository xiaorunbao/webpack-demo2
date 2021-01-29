import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import dialog from '../dialog/reducers';
import loading from '../loading/reducers';
import reducers from '../../config/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        dialog,
        loading,
        ...reducers,
        routing: routerReducer,
    }),
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
