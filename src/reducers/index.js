import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { reposReducer } from './repos'

export default combineReducers({
    router: routerReducer,
    repos: reposReducer
});
