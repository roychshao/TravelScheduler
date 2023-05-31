import { useState } from 'react'
import { joingroup } from './../../../../actions/groupAction.js'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions
} from '@mui/material';

const AddGroupMember = ({ groupId }) => {

    const dispatcher = useDispatch();
    const [open, setOpen] = useState(false);
    const [memberId, setMemberId] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        // call api here
        dispatcher(joingroup(memberId, groupId));
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Member
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter the userId of new member: </DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            margin="dense"
                            label="New member userId"
                            type="text"
                            fullWidth
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdate}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddGroupMember
