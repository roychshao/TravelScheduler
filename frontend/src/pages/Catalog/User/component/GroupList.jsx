import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, ListItemText } from "@mui/material"
import { getgroup } from './../../../../actions/groupAction.js'
import MemberList from './MemberList.jsx'
import UpdateGroup from './UpdateGroup.jsx'
import DeleteGroup from './DeleteGroup.jsx'
import AddGroupMember from './AddGroupMember.jsx'

const GroupList = () => {
    
    const dispatcher = useDispatch();
    const groups = useSelector(state => state.groupReducer.groups);

    useEffect(() => {
        dispatcher(getgroup());
        // console.log(groups[0][0].members);
    }, [])

    return (
        <List>
            {groups.length > 0 ? (
                groups[0].map((group) => (
                <ListItem key={group.group_id}>
                    <ListItemText primary={group.group_id}/>
                    <ListItemText primary={group.group_name}/>
                    <ListItemText primary={group.group_description}/>
                    <ListItemText primary={group.group_peoplenum}/>
                    <ListItemText primary={group.group_creator_id}/>
                    <ListItemText primary={group.group_creator_name}/>
                    <MemberList members={group.members[0]}/>
                    <AddGroupMember groupId={group.group_id}/>
                    <UpdateGroup groupId={group.group_id}/>
                    <DeleteGroup groupId={group.group_id} groupName={group.group_name}/>
                </ListItem>
                ))
            ):(
                <ListItem>
                    <ListItemText primary="No groups available"/>
                </ListItem>
            )}
        </List>
    )
}

export default GroupList
