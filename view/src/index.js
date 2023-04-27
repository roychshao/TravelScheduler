import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loginReducer from './../reducers/loginReducer.js';

const rootReducer = combineReducers({
    loginReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
