export const GIT_API = 'GIT_API_MIDDLEWARE'
export const FAVORITE_TOKEN_NAME = 'FAVORITE_TOKEN_NAME'

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
            error: error.message || 'Something bad happened'
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

                const nextPageUrl = getPageUrl(response, 'next')
                const prevPageUrl = getPageUrl(response, 'prev')
                const firstPageUrl = getPageUrl(response, 'first')
                const lastPageUrl = getPageUrl(response, 'last')

                const fList = getFavoriteList()

                return Object.assign({},
                    {lastPageUrl, firstPageUrl, prevPageUrl, nextPageUrl, data: json.map(v => {
                        v.$_favorite = fList.some(f => f == v.id)
                        return v
                    })}
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

const getFavoriteList = () => {
    let f = window.localStorage.getItem(FAVORITE_TOKEN_NAME)
    return f ? JSON.parse(f) : []
}