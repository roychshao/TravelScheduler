const initialState = {
    isLogin: false,
    loginWithGoogle: false,
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LoggedInWithGoogle':
            return {
                ...state,
                isLogin: true,
                loginWithGoogle: true,
            }
        case 'LoggedOutWithGoogle':
            return {
                ...state,
                isLogin: false,
                loginWithGoogle: false,
            }
        default:
            return state;
    }
};

export default loginReducer;
