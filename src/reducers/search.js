import { GIT_API } from '../middleware/git_api'

export const REPO_SEARCH = 'REPO_SEARCH'
export const REPO_SUCCESS = 'REPO_SUCCESS'
export const REPO_FAIL = 'REPO_FAIL'

export const initialState = {
    isLoading: false,
    failMsg: null,
    data: [],
    nextPageUrl: null,
    prevPageUrl: null,
}

const fetchRepo = repoName => ({
    [GIT_API]: {
        types: [ REPO_SEARCH, REPO_SUCCESS, REPO_FAIL ],
        endpoint: `search/repositories?q=org:${repoName}`,
    }
})

export const searchRepo = (fullName) => (dispatch, getState) => {
    return dispatch(fetchRepo(fullName))
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REPO_SEARCH:
            return Object.assign({}, state, {isLoading: true})
        case REPO_SUCCESS:
            console.log({action})
            return Object.assign({}, state, {isLoading: false, data: action.response.items})
        case REPO_FAIL:
            return Object.assign({}, initialState, {failMsg: action.payload})
        default:
            return state
    }
}