import { Fovorite } from '../../firebase';

export const favoriteActions = {

    FAVORITE_ERROR: 'FAVORITE_ERROR',
    FAVORITE_REMOVE_SUCCESS: 'FAVORITE_REMOVE_SUCCESS',
    FAVORITE_ADD_SUCCESS: 'FAVORITE_ADD_SUCCESS',
    FAVORITE_LOAD_SUCCESS: 'FAVORITE_LOAD_SUCCESS',
    FAVORITE_UPDATE_SUCCESS: 'FAVORITE_UPDATE_SUCCESS',

    addFavorite: id => dispatch => {
        favorite.push(id)
            .catch(err => dispatch(favoriteActions.errorFavorite(err)))
    },


    removeFavorite: key => dispatch => {
        favorite.remove(key)
            .catch(err => dispatch(favoriteActions.errorFavorite(err)))
    },

    loadFavorite: () => dispatch => {
        favorite.path = 'favorites'
        favorite.subscribe(dispatch)
    },

    addSuccessFavorite: id => ({
        type: favoriteActions.FAVORITE_ADD_SUCCESS,
        payload: id
    }),

    removeSuccessFavorite: id => ({
        type: favoriteActions.FAVORITE_REMOVE_SUCCESS,
        payload: id
    }),

    errorFavorite: error => ({
        type: favoriteActions.FAVORITE_ERROR,
        payload: error
    }),

    favoriteLoadedSuccess: f => ({
        type: favoriteActions.FAVORITE_LOAD_SUCCESS,
        payload: f
    }),

    favoriteUpdateSuccess: payload => ({
        type: favoriteActions.FAVORITE_UPDATE_SUCCESS,
        payload
    })

};

export const favorite = new Fovorite({
    onAdd: favoriteActions.addSuccessFavorite,
    onLoad: favoriteActions.favoriteLoadedSuccess,
    onChange: favoriteActions.favoriteUpdateSuccess,
    onRemove: favoriteActions.removeSuccessFavorite
});
