export const squareActions = {
    INC_COUNT: 'INC_COUNT',
    DIC_COUNT: 'DIC_COUNT',

    incCount: () => ({
        type: squareActions.INC_COUNT
    }),

    dicCount: () => ({
        type: squareActions.DIC_COUNT,
    })
};
