import { useState, useEffect } from 'react'
import { gettravel, createtravel } from './../../../../actions/travelAction.js'
import { useDispatch, useSelector } from 'react-redux'
import { getgroup } from './../../../../actions/groupAction.js'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Select,
    MenuItem
} from '@mui/material';


const CreateTravel = () => {

    const dispatcher = useDispatch();
    const travels = useSelector(state => state.travelReducer.travels);
    const [open, setOpen] = useState(false);
    const [travelName, setTravelName] = useState("");
    const [groupId, setGroupId] = useState("");
    const [travelDate, setTravelDate] = useState("");
    // const [travelPeoplenum, setTravelPeoplenum] = useState("");
    const [travelDescription, setTravelDescription] = useState("");
    // const [travelDone, setTravelDone] = useState("");

    const groups = useSelector(state => state.groupReducer.groups);
    useEffect(() => {
        dispatcher(getgroup());
    }, [])
    console.log(groups);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        // call api here
        dispatcher(createtravel(
            travelName,
            groupId,
            travelDate,
            // travelPeoplenum,
            travelDescription,
            // travelDone
            ));
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Create Travel
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a new Travel</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Name"
                            type="text"
                            fullWidth
                            value={travelName}
                            onChange={(e) => setTravelName(e.target.value)}
                        />
                        <Select
                            margin="dense"
                            label="Group Id"
                            type="text"
                            fullWidth
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}
                        >
                            {groups[0].map(group => (
                                 group.group_name && group.group_id ? (
                                    <MenuItem key={group.group_id} value={group.group_id}>
                                      {group.group_name}
                                    </MenuItem>
                                  ) : null
                            ))}

                        </Select>
                        <TextField
                            margin="dense"
                            label="Date"
                            type="date"
                            fullWidth
                            value={travelDate}
                            onChange={(e) => setTravelDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        {/* <TextField
                            margin="dense"
                            label="Number of People"
                            type="text"
                            fullWidth
                            value={travelPeoplenum}
                            onChange={(e) => setTravelPeoplenum(e.target.value)}
                        /> */}
                        <TextField
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            value={travelDescription}
                            onChange={(e) => setTravelDescription(e.target.value)}
                        />
                        {/* <TextField
                            margin="dense"
                            label="Done"
                            type="text"
                            fullWidth
                            value={travelDone}
                            onChange={(e) => setTravelDone(e.target.value)}
                        /> */}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateTravel
