import axios from 'axios';

export const loggedinwithgoogle = (displayName, email, photoURL) => ({
    type: 'LoggedInWithGoogle',
    payload: {
        displayName: displayName,
        email: email,
        photoURL: photoURL
    }
})

export const loggedoutwithgoogle = () => ({
    type: 'LoggedOutWithGoogle',
})

export const register = (displayName, email) => {
    return (dispatch) => {
        const hostUrl = import.meta.env.VITE_HOST_URL;
        axios.post(`${hostUrl}/api/user/register`, {
            username: displayName,
            email: email
        }).then(res => res = res.data)
        .then(res => {
            dispatch({
                type: "Register",
                payload: {
                    userId: res.data.user_id
                }
            })
        }).catch(err => {
            console.log('error: ' + err.message);
        })
    }
}
