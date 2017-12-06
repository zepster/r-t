import { push } from 'react-router-redux'

export const navigateToSearch = repository => (dispatch, getState) => {
    dispatch(push({
        pathname: `/search`,
        search: `?repository=${repository}`
    }))
}

