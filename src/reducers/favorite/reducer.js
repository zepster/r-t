import { favoriteActions } from './actions';

export const initialState = []

export function faovoriteReducer(state = initialState, action) {
    switch (action.type) {
        case favoriteActions.FAVORITE_LOAD_SUCCESS:
            return action.payload;
        case favoriteActions.FAVORITE_ADD_SUCCESS:
            return [...state, action.payload]
        case favoriteActions.FAVORITE_REMOVE_SUCCESS:
            return state.filter(v => v.key !== action.payload.key)
        default:
            return state;
    }
}
