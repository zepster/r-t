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
            failMsg: error.message || 'Something bad happened'
        }))
    )
}

const API_ROOT = 'https://api.github.com/'

const callApi = (endpoint) => {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

    return fetch(fullUrl)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json)
                }

                const nextPageUrl = getNextPageUrl(response)
                const prevPageUrl = getPrevPageUrl(response)
                const totalCount = getTotalCount(response)

                return Object.assign({}, { prevPageUrl, nextPageUrl, totalCount, items: json }
                )
            })
        )
}

const getNextPageUrl = response => {
    const link = response.headers.get('link')
    if (!link) {
        return null
    }

    const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
    if (!nextLink) {
        return null
    }

    return nextLink.split(';')[0].slice(1, -1)
}

const getPrevPageUrl = response => {
    const link = response.headers.get('link')
    if (!link) {
        return null
    }

    const prevLink = link.split(',').find(s => s.indexOf('rel="prev"') > -1)
    if (!prevLink) {
        return null
    }

    return prevLink.split(';')[0].slice(2, -1)
}

const getTotalCount = response => {
    const link = response.headers.get('link')
    if (!link) {
        return null
    }

    const totalCount = link.split(',').find(s => s.indexOf('rel="last"') > -1)
    if (!totalCount) {
        return 0
    }

    return totalCount.match( /page=([0-9]*).*/)[1]
}
