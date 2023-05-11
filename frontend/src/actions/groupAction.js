import axios from 'axios';

//Get
export const getGroups = () => {
    return (dispatch) => {
        dispatch({ type: 'FETCH_GROUP_REQUEST' });
        axios.get('/api/group')
            .then(response => {
                dispatch({
                    type: 'FETCH_GROUP_SUCCESS',
                    payload: response.data.data.groups
                });
            })
            .catch(error => {
                dispatch({
                    type: 'FETCH_GROUP_FAILURE',
                    payload: error.message
                });
            });
    };
};


//Create
export const createGroup = (groupData) => {
    return (dispatch) => {
        dispatch({ type: 'CREATE_GROUP_REQUEST' });
        axios.post('/api/group/create', groupData)
            .then(response => {
                dispatch({
                    type: 'CREATE_GROUP_SUCCESS',
                    payload: response.data.data
                });
            })
            .catch(error => {
                dispatch({
                    type: 'CREATE_GROUP_FAILURE',
                    payload: error.message
                });
            });
    };
};

//Join
export const joinGroup = (groupId, userId) => {
    return (dispatch) => {
        dispatch({ type: 'JOIN_GROUP_REQUEST' });
        axios.put('/api/group/join', {
            group_id: groupId,
            user_id: userId
        })
            .then(response => {
                dispatch({
                    type: 'JOIN_GROUP_SUCCESS',
                    payload: response.data.data
                });
            })
            .catch(error => {
                dispatch({
                    type: 'JOIN_GROUP_FAILURE',
                    payload: error.message
                });
            });
    };
};

//Kick
export const kickMember = (groupId, userId) => {
    return (dispatch) => {
        dispatch({ type: 'KICK_MEMBER_REQUEST' });
        axios.put('/api/group/kick', {
            group_id: groupId,
            user_id: userId,
        })
            .then(response => {
                dispatch({
                    type: 'KICK_MEMBER_SUCCESS',
                    payload: { groupId, userId }
                });
            })
            .catch(error => {
                dispatch({
                    type: 'KICK_MEMBER_FAILURE',
                    payload: error.message
                });
            });
    };
};

// Edit
export const editGroup = (groupId, groupName, groupDescription) => {
    return (dispatch) => {
        dispatch({ type: 'EDIT_GROUP_REQUEST' });
        axios.put('/api/group/edit', {
            group_id: groupId,
            group_name: groupName,
            group_description: groupDescription
        })
            .then(response => {
                dispatch({
                    type: 'EDIT_GROUP_SUCCESS',
                    payload: response.data.data
                });
            })
            .catch(error => {
                dispatch({
                    type: 'EDIT_GROUP_FAILURE',
                    payload: error.message
                });
            });
    };
};

//Delete
export const deleteGroup = (groupId) => {
    return (dispatch) => {
        dispatch({ type: 'DELETE_GROUP_REQUEST' });
        axios.delete('/api/group/delete', {
            data: { group_id: groupId }
        })
            .then(response => {
                dispatch({
                    type: 'DELETE_GROUP_SUCCESS',
                    payload: groupId
                });
            })
            .catch(error => {
                dispatch({
                    type: 'DELETE_GROUP_FAILURE',
                    payload: error.message
                });
            });
    };
};