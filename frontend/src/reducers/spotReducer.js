const initialState = {
    spots: []

};



const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GetTravelSpot':
            return {
                ...state,
                spots: [action.payload]

            };
        default:
            return state;
    }
};

export default spotReducer;
