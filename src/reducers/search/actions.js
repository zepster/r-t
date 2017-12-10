import { push } from 'react-router-redux'

export const searchActions = {
    SEARCH_SET_QUERY: 'SEARCH_SET_QUERY',

    navigateToSearch: repo => dispatch => {
        dispatch(searchActions.searchSetQuery(repo))
        dispatch(push({
            pathname: `/search`,
            search: `?repository=${repo}&page=1`
        }))
    },

    searchSetQuery: query => ({
        type: searchActions.SEARCH_SET_QUERY,
        payload: query
    })
};
