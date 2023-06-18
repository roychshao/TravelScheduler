import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from "@mui/material"
import { gettravel, deletetravel } from './../../../../actions/travelAction.js'
import EditTravel from './EditTravel.jsx'
import DeleteTravel from './DeleteTravel.jsx'
import DoneTravel from './DoneTravel.jsx'
import TravelDetail from '../TravelDetail.jsx'

const TravelList = ({open}) => {

    const dispatcher = useDispatch();
    const travels = useSelector(state => state.travelReducer.travels);
    useEffect(() => {
        dispatcher(gettravel());
    }, [])
    // console.log(travels);


    return (
        <div>
            <List>
                <ListItem>
                    <ListItemText primary="Travel Name" />
                    {/* <ListItemText primary="Travel Description" /> */}
                    {/* <ListItemText primary="Travel PeopleNum" /> */}
                    {/* <ListItemText primary="Travel Date" /> */}
                    {/* <ListItemText primary="Travel Done" /> */}
                    <ListItemText primary="Travel ID" />
                    {/* <ListItemText primary="Group ID" /> */}
                </ListItem>
                {travels.length > 0 ? (
                    travels[0].map((travel) => (
                <ListItem key={travel.travel_id}>
                    <ListItemText primary={travel.travel_name} />
                    {/* <ListItemText primary={travel.travel_description} />
                    <ListItemText primary={travel.travel_peoplenum} />
                    <ListItemText primary={travel.travel_date} />
                    <ListItemText primary={travel.travel_done} /> */}
                    <ListItemText primary={travel.travel_id} />
                    {/* <ListItemText primary={travel.group_id} /> */}
                    <DoneTravel targetTravel={travel} />
                    {/* <Button variant="contained" color="warning" style={{ marginRight: '10px' }} onClick={open}>Set</Button> */}
                    {/* <Button variant="contained" color="warning" style={{ marginRight: '10px' }} onClick={open} travelid={travel.travel_id} >Set</Button> */}
                    <TravelDetail variant="contained" color="warning" style={{ marginRight: '10px' }} onClick={open} travelid={travel.travel_id} />

                    <EditTravel targetTravel={travel} />
                    <DeleteTravel travelId={travel.travel_id} />


                </ListItem>
                ))
                ) : (
                <ListItem>
                    <ListItemText primary="No travels available" />
                </ListItem>
                )}
            </List>
        </div>
    )
}

export default TravelList