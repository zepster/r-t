import { searchActions } from './actions';

export const initialState = {
    query: ''
}

export function searchReducer(state = initialState, action) {
    switch (action.type) {
        case searchActions.SEARCH_SET_QUERY:
            return state.query === action.payload ? state : Object.assign({}, state, {query: action.payload});
        default:
            return state;
    }
}
