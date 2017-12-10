import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { reposReducer } from './repos'
import { faovoriteReducer } from './favorite'
import { searchReducer } from './search'

export default combineReducers({
    router: routerReducer,
    repos: reposReducer,
    search: searchReducer,
    favorite: faovoriteReducer
});
