const initialState = {
    groups: []
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GetGroup':
            return {
                ...state,
                groups: [action.payload]
            }
        case 'CreateGroup':
            return {
                ...state
            }
        default:
            return state;
    }
}

export default groupReducer;
