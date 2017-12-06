import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import {reducer as repoList} from './repolist'

export default combineReducers({
    router: routerReducer,
    repoList
});
