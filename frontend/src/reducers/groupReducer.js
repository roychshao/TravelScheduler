const initialState = {
    groups: []
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Get':
            return {
                ...state,
                groups: [action.payload]
            }
        case 'Create':
            return {
                ...state
            }
        default:
            return state;
    }
}

export default groupReducer;
