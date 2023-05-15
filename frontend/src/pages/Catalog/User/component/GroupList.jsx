import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, ListItemText } from "@mui/material"
import { getgroup } from './../../../../actions/groupAction.js'

const GroupList = () => {
    
    const dispatcher = useDispatch();
    const groups = useSelector(state => state.groupReducer.groups);

    useEffect(() => {
        dispatcher(getgroup());
    }, [])

    return (
        <List>
            {groups && groups[0] ? (
                groups[0].map((group) => (
                <ListItem key={group.group_id}>
                    <ListItemText primary={group.group_id}/>
                    <ListItemText primary={group.group_name}/>
                    <ListItemText primary={group.group_description}/>
                    <ListItemText primary={group.group_peoplenum}/>
                    <ListItemText primary={group.group_creator_id}/>
                    <ListItemText primary={group.group_creator_name}/>
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
