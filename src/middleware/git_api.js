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
                nextPageUrl: 'https://api.github.com/repositories/36535156/forks?page=2',
                lastPageUrl: 'https://api.github.com/repositories/36535156/forks?page=273',
                failMsg: error.message
            }
        }))
    )
}

const API_ROOT = 'https://api.github.com/'

const callApi = (endpoint) => {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint


    return Promise.reject({message: 'my reject'})

    return fetch(fullUrl)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json)
                }

                const nextPageUrl = getPageUrl(response, 'next')
                const prevPageUrl = getPageUrl(response, 'prev')
                const firstPageUrl = getPageUrl(response, 'first')
                const lastPageUrl = getPageUrl(response, 'last')

                return Object.assign({},
                    {lastPageUrl, firstPageUrl, prevPageUrl, nextPageUrl, data: json}
                )
            })
        )
}

const getPageUrl = (response, rel) => {
    const link = response.headers.get('link')
    if (!link) {
        return null
    }

    const _link = link.split(',').find(s => s.indexOf(`rel="${rel}"`) > -1)
    if (!_link) {
        return null
    }
    return _link.trim().split(';')[0].slice(1, -1)
}


// const [path, nextBaseUrl, nextPage] = _link.trim().split(';')[0].slice(1, -1).match(/^(.*)\?page=(\d)*/)