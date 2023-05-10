const initialState = {
    isLoading: false,
    errorMessage: null,
    spots: []
  };
  
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_SPOTS_REQUEST':
        return {
            ...state,
            isLoading: true,
            errorMessage: null
        };
        case 'FETCH_SPOTS_SUCCESS':
        return {
            ...state,
            isLoading: false,
            spots: action.payload
        };
        case 'FETCH_SPOTS_FAILURE':
        return {
            ...state,
            isLoading: false,
            errorMessage: action.payload
        };
        default:
        return state;
    }
};

export default spotReducer;