import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loginReducer from './../reducers/loginReducer.js';
import userReducer from './../reducers/userReducer';

const rootReducer = combineReducers({
    loginReducer,
    userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
