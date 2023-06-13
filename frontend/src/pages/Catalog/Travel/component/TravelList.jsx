import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, ListItemText } from "@mui/material"
import { gettravel } from './../../../../actions/travelAction.js'

const TravelList = () => {
    
    const dispatcher = useDispatch();
    const travels = useSelector(state => state.travelReducer.travels);

    useEffect(() => {
        dispatcher(gettravel());
    }, [])

    return (
        <List>
            {travels.length > 0 ? (
                travels[0].map((travel) => (
                <ListItem key={travel.travel_id}>
                    <ListItemText primary={travel.travel_id}/>
                    <ListItemText primary={travel.travel_name}/>
                    <ListItemText primary={travel.travel_description}/>
                    <ListItemText primary={travel.travel_peoplenum}/>
                    <ListItemText primary={travel.travel_date}/>
                    <ListItemText primary={travel.travel_done}/>
                    <ListItemText primary={travel.group_id}/>

                </ListItem>
                ))
            ):(
                <ListItem>
                    <ListItemText primary="No travels available"/>
                </ListItem>
            )}
        </List>
    )
}

export default TravelList