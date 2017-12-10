import { createSelector } from 'reselect';

export function getFavorite(state) {
    return state.favorite;
}

const getRepoId = (props) =>
    props.repoId

export const getFavoriteStatus = createSelector(
    (state) => getFavorite(state),
    (state, props) => getRepoId(props),
    (favorites, id) => {
        let obj = favorites.find(v => parseInt(v.value) === parseInt(id))
        return {
            isFavorite: obj ? true : false,
            favoriteKey: obj ? obj.key : null
        }
    }
)