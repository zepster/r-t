import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import {reducer as repoList} from './search'

export default combineReducers({
    router: routerReducer,
    repoList
});
