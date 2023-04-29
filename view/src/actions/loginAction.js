export const loggedinwithgoogle = (displayName, email, photoURL) => ({
    type: 'LoggedInWithGoogle',
    payload: {
        displayName,
        email,
        photoURL
    }
})

export const loggedoutwithgoogle = () => ({
    type: 'LoggedOutWithGoogle',
})
