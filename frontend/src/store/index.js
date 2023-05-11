import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loginReducer from './../reducers/loginReducer.js';
import spotReducer from './../reducers/spotReducer.js';
import groupReducer from './../reducers/groupReducer.js';

const rootReducer = combineReducers({
    loginReducer,
    spotReducer,
    groupReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
