import { reposActions } from './actions';

export const initialState = {
    isLoading: false,
    failMsg: null,
    data: [],
    firstUrl: null,
    prevUrl: null,
    nextUrl: null,
    lastUrl: null,
}

export function reposReducer(state = initialState, action) {
    switch (action.type) {
        case reposActions.REPO_SEARCH:
            return Object.assign({}, state, {isLoading: true});
        case reposActions.REPO_SUCCESS:
            return Object.assign({}, state, {isLoading: false, ...action.response});
        case reposActions.REPO_FAIL:
            return Object.assign({}, initialState, {...action.response});
        default:
            return state;
    }
}
