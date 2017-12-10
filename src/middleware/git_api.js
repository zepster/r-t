export const GIT_API = 'GIT_API_MIDDLEWARE'

export default store => next => action => {
    const callAPI = action[GIT_API]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint } = callAPI
    const { types } = callAPI

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }


    const actionWith = data => {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[GIT_API]
        return finalAction
    }

    const [ requestType, successType, failureType ] = types
    next(actionWith({ type: requestType }))

    return callApi(endpoint).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            response: {
                failMsg: error.message
            }
        }))
    )
}

const API_ROOT = 'http://localhost:3001/find'

const callApi = (endpoint) => {

    const fullUrl = API_ROOT + endpoint;

    return fetch(fullUrl)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json)
                }
                return Object.assign({},
                    json
                )
            })
        )
}
