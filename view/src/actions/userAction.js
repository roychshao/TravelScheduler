export const setuserprofile = (displayName, email) => ({
    type: 'SetUserProfile',
    payload: {
        displayName,
        email
    }
})
