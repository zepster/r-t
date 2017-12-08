import { GIT_API } from '../../middleware/git_api'

export const reposActions = {
    REPO_SEARCH: 'REPO_SEARCH',
    REPO_SUCCESS: 'REPO_SUCCESS',
    REPO_FAIL: 'REPO_FAIL',

    fetchRepos: (name, page) => {
        return {
            [GIT_API]: {
                types: [
                    reposActions.REPO_SEARCH,
                    reposActions.REPO_SUCCESS,
                    reposActions.REPO_FAIL
                ],
                endpoint: {name, page}
            }
        }
    },
    fetchPage: (page) => {
        return {
            [GIT_API]: {
                types: [
                    reposActions.REPO_SEARCH,
                    reposActions.REPO_SUCCESS,
                    reposActions.REPO_FAIL
                ],
                endpoint: {name: null, page}
            }
        }
    }
};
