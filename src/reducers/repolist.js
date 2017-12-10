import { GIT_API } from '../middleware/git_api'

export const REPO_SEARCH = 'REPO_SEARCH'
export const REPO_SUCCESS = 'REPO_SUCCESS'
export const REPO_FAIL = 'REPO_FAIL'
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'

export const initialState = {
    isLoading: false,
    failMsg: null,
    data: [],
    nextUrl: null,
    prevPageUrl: null,
    firstPageUrl: null,
    lastPageUrl: null,
}

const fetchRepos = endpoint => ({
    [GIT_API]: {
        types: [ REPO_SEARCH, REPO_SUCCESS, REPO_FAIL ],
        endpoint: endpoint //`repos/${repoName}/forks`,
    }
})

export const searchRepo = (fullName) => dispatch => {
    return dispatch(fetchRepos(`repos/${fullName}/forks`))
}

export const fetchPage = page => dispatch => {
    return dispatch(fetchRepos(page))
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REPO_SEARCH:
            return Object.assign({}, state, {isLoading: true})
        case REPO_SUCCESS:
            return Object.assign({}, state, {isLoading: false, ...action.response})
        case REPO_FAIL:
            return Object.assign({}, initialState, {failMsg: action.payload})
        default:
            return state
    }
}