import { GIT_API } from '../middleware/git_api'

export const REPO_SEARCH = 'REPO_SEARCH'
export const REPO_SUCCESS = 'REPO_SUCCESS'
export const REPO_FAIL = 'REPO_FAIL'

export const REPO_PAGI_NEXT_SUCCESS = 'REPO_PAGI_NEXT_SUCCESS'
export const REPO_PAGI_PREV_SUCCESS = 'REPO_PAGI_PREV_SUCCESS'

export const initialState = {
    isLoading: false,
    failMsg: null,
    items: [],
    nextPageUrl: null,
    prevPageUrl: null,
    totalCount: 0,
    page: 0
}

const fetchRepo = endpoint => ({
    [GIT_API]: {
        types: [ REPO_SEARCH, REPO_SUCCESS, REPO_FAIL ],
        endpoint: endpoint,
    }
})

const nextPagi = endpoint => ({
    [GIT_API]: {
        types: [ REPO_SEARCH, REPO_PAGI_NEXT_SUCCESS, REPO_FAIL ],
        endpoint: endpoint,
    }
})

const prevPagi = endpoint => ({
    [GIT_API]: {
        types: [ REPO_SEARCH, REPO_PAGI_PREV_SUCCESS, REPO_FAIL ],
        endpoint: endpoint,
    }
})

export const searchRepo = (fullName) => (dispatch, getState) => {
    let name = `repos/${fullName}/forks`
    return dispatch(fetchRepo(name))
}

export const fetchPageNext = page => (dispatch, getState) => {
    return dispatch(nextPagi(page))
}

export const fetchPagePrev = page => (dispatch, getState) => {
    return dispatch(prevPagi(page))
}



export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REPO_SEARCH:
            return Object.assign({}, state, {isLoading: true, page: 0})
        case REPO_SUCCESS:
            return Object.assign({}, state, {isLoading: false, ...action.response})
        case REPO_PAGI_NEXT_SUCCESS:
            return Object.assign({}, state, {isLoading: false, ...action.response, page: state.page+1})
        case REPO_PAGI_PREV_SUCCESS:
            return Object.assign({}, state, {isLoading: false, ...action.response, page: state.page-1})
        case REPO_FAIL:
            return Object.assign({}, initialState, {failMsg: action.payload})
        default:
            return state
    }
}