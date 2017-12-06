import { GIT_API, FAVORITE_TOKEN_NAME } from '../middleware/git_api'

export const REPO_SEARCH = 'REPO_SEARCH'
export const REPO_SUCCESS = 'REPO_SUCCESS'
export const REPO_FAIL = 'REPO_FAIL'
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'

export const initialState = {
    isLoading: false,
    failMsg: null,
    data: [],
    nextPageUrl: null,
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

export const toggleFavorite = id => dispatch => {
    let storage = window.localStorage.getItem(FAVORITE_TOKEN_NAME)
    if (!storage) {
        storage = new Set()
    } else {
        storage = new Set([...JSON.parse(storage)])
    }

    if (storage.has(id)) {
        storage.delete(id);
    } else {
        storage.add(id)
    }
    window.localStorage.setItem(FAVORITE_TOKEN_NAME, JSON.stringify(Array.from(storage)))
    dispatch({type: TOGGLE_FAVORITE, payload: id})
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REPO_SEARCH:
            return Object.assign({}, state, {isLoading: true})
        case REPO_SUCCESS:
            return Object.assign({}, state, {isLoading: false, ...action.response})
        case REPO_FAIL:
            return Object.assign({}, initialState, {failMsg: action.payload})
        case TOGGLE_FAVORITE:
            return Object.assign(
                {},
                state,
                {data: state.data.map(v => {
                    if (v.id == action.payload) {
                        v.$_favorite = !v.$_favorite
                    }
                    return v
                } )}
            )
        default:
            return state
    }
}