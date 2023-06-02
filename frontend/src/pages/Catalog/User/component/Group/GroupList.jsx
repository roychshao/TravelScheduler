import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUseStyles } from 'react-jss'
// import { List, ListItem, ListItemText } from "@mui/material"
import { getgroup } from './../../../../../actions/groupAction.js'
import GroupMark from './../../../../../assets/GroupList/groupMark.png'
import EditGroup from './../../../../../assets/GroupList/editGroup.png'

import MemberList from './MemberList.jsx'
import UpdateGroup from './UpdateGroup.jsx'
import DeleteGroup from './DeleteGroup.jsx'
import AddGroupMember from './AddGroupMember.jsx'
import GroupDetails from './GroupDetails.jsx'

const GroupList = () => {
   
    const useStyles = createUseStyles({
        Container: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '82px',    // avoid to cover te bottomNavbar
        },
        Wrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '90%',
        },
        Group: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: '75px',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.12) 111.54%, rgba(255, 184, 0, 0.4) 211.54%)',
            border: '1px solid #F9F8F4',
            // boxShadow: 'inset 0px 5px 5px rgba(255, 184, 0, 0.4), inset 0px -5px 10px rgba(249, 248, 244, 0.55)',
            borderRadius: '15px',
        },
        InfoWrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        GroupMark: {
            width: '30px',
            height: '30px',
            marginRight: '10px',
        },
        GroupName: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.15em',
            color: '#FFB800',
        },
        DetailedInfo: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '20px',
            /* identical to box height */
            letterSpacing: '0.15em',
            color: 'rgba(152, 152, 152, 0.6)',
        },
        EditGroupWrapper: {
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
    })

    const classes = useStyles();
    const dispatcher = useDispatch();
    const groups = useSelector(state => state.groupReducer.groups);

    useEffect(() => {
        dispatcher(getgroup());
    }, [])

    const [openMap, setOpenMap] = useState({});

    const handleOpen = (groupId) => {
        // console.log(groups[0][0].members);
        setOpenMap((prevState) => ({
            ...prevState,
            [groupId]: true,
        }));
    };

    const handleClose = (groupId) => {
        setOpenMap((prevState) => ({
            ...prevState,
            [groupId]: false,
        }));
    };

    return (
        <div className={classes.Container}>
            <div className={classes.Wrapper}>
                {groups.length > 0 ? (
                    groups[0].map((group) => (
                        <div className={classes.Group} key={group.group_id}>
                            <div className={classes.InfoWrapper}>
                                <img src={GroupMark} className={classes.GroupMark}/>
                                <div>
                                    <div className={classes.GroupName}>{group.group_name}</div>
                                    <div className={classes.DetailedInfo}>{group.group_creator_name}, {group.members[0].length} people</div>
                                </div>
                            </div>
                            <div className={classes.EditGroupWrapper}>
                                <img src={EditGroup} alt="edit group icon" onClick={() => handleOpen(group.group_id)}/>
                            </div>
                            {openMap[group.group_id] ? <GroupDetails
                                group_id={group.group_id}
                                group_name={group.group_name}
                                group_creator_name={group.group_creator_name}
                                group_peoplenum={group.group_peoplenum}
                                members={group.members}
                                handleClose={() => handleClose(group.group_id)}
                            /> : <></>}
                        </div> 
                    ))
                ):(
                    <div>
                        <div>No groups available</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GroupList
