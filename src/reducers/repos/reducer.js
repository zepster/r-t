import { reposActions } from './actions';

export const initialState = {
    isLoading: false,
    failMsg: null,
    data: [],
    nextPageUrl: null,
    prevPageUrl: null,
    firstPageUrl: null,
    lastPageUrl: null,
    nextBaseUrl: null,
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
