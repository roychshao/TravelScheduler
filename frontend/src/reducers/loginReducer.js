const initialState = {
    loginWithGoogle: false,
    userId: "",
    displayName: "",
    email: "",
    photoURL: "",
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LoggedInWithGoogle':
            return {
                ...state,
                loginWithGoogle: true,
                displayName: action.payload.displayName,
                email: action.payload.email,
                photoURL: action.payload.photoURL
            }
        case 'LoggedOutWithGoogle':
            return {
                ...state,
                loginWithGoogle: false,
                displayName: "",
                email: "",
                photoURL: ""
            }
        case 'Register':
            return {
                ...state,
                userId: action.payload.userId
            }
        default:
            return state;
    }
};

export default loginReducer;
