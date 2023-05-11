const initialState = {
    isLoading: false,
    errorMessage: null,
    groups: []
};

const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        //Get
        case 'FETCH_GROUP_REQUEST':
        case 'CREATE_GROUP_REQUEST':
        case 'JOIN_GROUP_REQUEST':
        case 'KICK_MEMBER_REQUEST':
        case 'EDIT_GROUP_REQUEST':
        case 'DELETE_GROUP_REQUEST':
            return {
                ...state,
                isLoading: true,
                errorMessage: null
            };
        //Get
        case 'FETCH_GROUP_SUCCESS':
            return {
                ...state,
                isLoading: false,
                groups: action.payload
            };
        //Create
        case 'CREATE_GROUP_SUCCESS':
            return {
                ...state,
                isLoading: false,
                groups: [...state.groups, action.payload]
            };

        //Join
        case 'JOIN_GROUP_SUCCESS':
            const updatedGroups_join = state.groups.map(group => {
                if (group.group_id === action.payload.group_id) {
                    return action.payload;
                }
                return group;
            });
            return {
                ...state,
                isLoading: false,
                groups: updatedGroups_join
            };

        //Kick
        case 'KICK_MEMBER_SUCCESS':
            const { groupId, userId } = action.payload;
            const updatedGroups_kick = state.groups.map(group => {
                if (group.group_id === groupId) {
                    const updatedMembers = group.members.filter(member => member.user_id !== userId);
                    return { ...group, members: updatedMembers };
                } else {
                    return group;
                }
            });
            return {
                ...state,
                isLoading: false,
                groups: updatedGroups_kick
            };
        //Edit
        case 'EDIT_GROUP_SUCCESS':
            const editedGroup = action.payload;
            const updatedGroups_edit = state.groups.map(group => {
                if (group.group_id === editedGroup.group_id) {
                    return editedGroup;
                }
                return group;
            });
            return {
                ...state,
                isLoading: false,
                groups: updatedGroups_edit
            };
        //Delete
        case 'DELETE_GROUP_SUCCESS':
            return {
                ...state,
                isLoading: false,
                groups: state.groups.filter(group => group.group_id !== action.payload)
            };
        
        case 'FETCH_GROUP_FAILURE':
        case 'CREATE_GROUP_FAILURE':
        case 'JOIN_GROUP_FAILURE':
        case 'KICK_MEMBER_FAILURE':
        case 'EDIT_GROUP_FAILURE':
        case 'DELETE_GROUP_FAILURE':
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            };


        default:
            return state;
    }
};



export default groupReducer;