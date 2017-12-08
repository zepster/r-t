import { push } from 'react-router-redux'

export const navigateToSearch = repository => dispatch => {
    dispatch(push({
        pathname: `/search`,
        search: `?repository=${repository}&page=1`
    }))
}

