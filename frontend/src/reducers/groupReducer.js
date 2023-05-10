const initialState = {
    groups: []
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Create':
            return {
                ...state,
                groups: [...state.groups, action.payload]
            }
        default:
            return state;
    }
}

export default groupReducer;
