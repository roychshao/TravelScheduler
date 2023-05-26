import { useState } from 'react'
import { getgroup, creategroup } from './../../../../actions/groupAction.js'
import { useDispatch, useSelector } from 'react-redux'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions
} from '@mui/material';

const CreateGroup = () => {

    const dispatcher = useDispatch();
    const groups = useSelector(state => state.groupReducer.groups);
    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreate = () => {
        // call api here
        dispatcher(creategroup(groupName, groupDescription ));
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Create Group
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a new Group</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Group Name"
                            type="text"
                            fullWidth
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        /><TextField
                            margin="dense"
                            label="Description"
                            type="text"
                            fullWidth
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                        />
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

export default CreateGroup
