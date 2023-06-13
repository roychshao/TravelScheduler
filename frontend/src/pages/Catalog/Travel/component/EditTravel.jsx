import { useState } from 'react';
import { edittravel } from '../../../../actions/travelAction';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from '@mui/material';

const EditTravel = () => {
    const dispatcher = useDispatch();
    const [open, setOpen] = useState(false);
    const [travelId, setTravelId] = useState("");
    const [travelName, setTravelName] = useState("");
    const [groupId, setGroupId] = useState("");
    const [travelDate, setTravelDate] = useState("");
    const [travelPeoplenum, setTravelPeoplenum] = useState("");
    const [travelDescription, setTravelDescription] = useState("");
    const [travelDone, setTravelDone] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        // call api here
        dispatcher(
            edittravel(
                travelId,
                travelName,
                travelDate,
                travelPeoplenum,
                travelDescription,
                groupId,
                travelDone
            )
        );
        setOpen(false);
    };



    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Update
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Travel</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Travel ID"
                            type="text"
                            fullWidth
                            value={travelId}
                            onChange={(e) => setTravelId(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="New Travel Name"
                            type="text"
                            fullWidth
                            value={travelName}
                            onChange={(e) => setTravelName(e.target.value)}
                        />
                         <TextField
                            autoFocus
                            margin="dense"
                            label="New Date"
                            type="date"
                            fullWidth
                            value={travelDate}
                            onChange={(e) => setTravelDate(e.target.value)}
                        />
                         <TextField
                            autoFocus
                            margin="dense"
                            label="New Number of People"
                            type="text"
                            fullWidth
                            value={travelPeoplenum}
                            onChange={(e) => setTravelPeoplenum(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="New Description"
                            type="text"
                            fullWidth
                            value={travelDescription}
                            onChange={(e) => setTravelDescription(e.target.value)}
                        />
                         <TextField
                            autoFocus
                            margin="dense"
                            label="New Group ID"
                            type="text"
                            fullWidth
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}
                        />
                         <TextField
                            autoFocus
                            margin="dense"
                            label="Done or Not"
                            type="text"
                            fullWidth
                            value={travelDone}
                            onChange={(e) => setTravelDone(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditTravel;
