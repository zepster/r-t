import { squareActions } from './actions';

export const initialState = {
    color: 'black',
    count: 0
}

export function squareReducer(state = initialState, {payload, type}) {
    switch (type) {
        case squareActions.INC_COUNT:
            return Object.assign({}, state, {count: state.count === 100 ? 0 : state.count + 5})

        case squareActions.DIC_COUNT:
            return Object.assign({}, state, {count: state.count - 5})

        default:
            return state;
    }
}