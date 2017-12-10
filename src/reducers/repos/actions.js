import { GIT_API } from '../../middleware/git_api'

export const reposActions = {
    REPO_SEARCH: 'REPO_SEARCH',
    REPO_SUCCESS: 'REPO_SUCCESS',
    REPO_FAIL: 'REPO_FAIL',

    fetchRepos: (name, page = 1) => {
        return {
            [GIT_API]: {
                types: [
                    reposActions.REPO_SEARCH,
                    reposActions.REPO_SUCCESS,
                    reposActions.REPO_FAIL
                ],
                endpoint: `?repo=${name}&page=${page}`
            }
        }
    }
}

