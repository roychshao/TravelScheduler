const initialState = {
    displayName: "",
    email: "",
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SetUserProfile':
            return {
                ...state,
                displayName: action.payload.displayName,
                email: action.payload.email
            }
        default:
            return state;
    }
}

export default userReducer;
