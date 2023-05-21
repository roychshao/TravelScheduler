const initialState = {
    travels: []
};

const travelReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Get':
            return {
                ...state,
                travels: [action.payload]
            }
        case 'Create':
            return {
                ...state
            }
        default:
            return state;
    }
}

export default travelReducer;