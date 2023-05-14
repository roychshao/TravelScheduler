const initialState = {
    spots: []
};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Get':
            return {
                ...state,
                spots: action.payload
            };
        default:
            return state;
    }
};

export default spotReducer;