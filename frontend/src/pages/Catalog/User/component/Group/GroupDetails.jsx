import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useDispatch } from 'react-redux'
import { joingroup, kickgroup } from './../../../../../actions/groupAction.js'
import GroupMark from './../../../../../assets/GroupList/groupMark.png'
import CreateIcon from './../../../../../assets/CreateGroup/createIcon.png'
import KickIcon from './../../../../../assets/GroupDetails/kickIcon.png'

const GroupDetails = ({group_id, group_name, group_creator_name, group_peoplenum, members, handleClose}) => {

    const useStyles = createUseStyles({
        Overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            zIndex: 1000,
        },
        Dialog: {
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            top: '18%',
            left: '10%',
            width: '80%',
            height: '64%',
            zIndex: 1001,
            background: 'linear-gradient(180deg, rgba(249, 249, 244) 0%, rgba(241, 238, 230) 100%)',
            border: '0.5px solid #F9F8F4',
            boxShadow: 'inset 1px 1px 1px rgba(244, 249, 249, 0.55)',
            borderRadius: '10px',
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
        CreateMemberWrapper: {
            display: 'flex',
            width: '82%',
            paddingLeft: '4%',
            paddingRight: '4%',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '38px',
            background: 'linear-gradient(180deg, rgba(255, 184, 0, 0.25) 0%, rgba(255, 184, 0, 0.6) 100%)',
            mixBlendMode: 'normal',
            borderRadius: '5px',
        },
        GroupMemberText: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '13px',
            lineHeight: '18px',
            letterSpacing: '0.15em',
            color: '#F9F8F4',
            textShadow: '0px 1px 4px rgba(210, 188, 131, 0.15)',
        },
        JoinBtn: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '26px',
            width: '26px',
            background: '#F9F8F4',
            boxShadow: '0px 3px 4px rgba(210, 188, 131, 0.15), inset 0px -5px 10px rgba(245, 245, 245, 0.55), inset 0px -10px 10px rgba(255, 184, 0, 0.4)',
            borderRadius: '5px',
            border: '0px',
        },
        JoinIcon: {
            width: '15px',
            height: '15px',
        },
        MemberList: {
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '208px',
            width: '90%',
        },
        MemberWrapper: {
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            width: '100%',
            height: '50px',
            background: 'rgba(255, 184, 0, 0.1)',
            borderRadius: '5px',
            paddingLeft: '15px',
            marginTop: '2px',
        },
        MemberInfoWrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'left',
            paddingLeft: '15px',
        },
        MemberName: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '17px',
            letterSpacing: '0.15em',
            color: '#FFB800',
        },
        MemberEmail: {
            fontFamily: 'Paytone One',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '12px',
            lineHeight: '17px',
            /* identical to box height */
            letterSpacing: '0.15em',
            color: 'rgba(152, 152, 152, 0.6)',
        }
    })

    const classes = useStyles();
    const dispatcher = useDispatch();
    const [newMemerId, setNewMemberId] = useState("");
    
    const handleInputChanged = (e) => {
        setNewMemberId(e.target.value);
    }

    const handleJoin = () => {
        if(newMemerId.length != 0) {
            dispatcher(joingroup(newMemerId, group_id));
        }
    }

    const handleKick = (memberId) => {
        dispatcher(kickgroup(memberId, group_id));
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Overlay} onClick={handleClose}></div>
            <div className={classes.Dialog}>
                <div className={classes.InfoWrapper}>
                    <img src={GroupMark} className={classes.GroupMark}/>
                    <div>
                        <div className={classes.GroupName}>{group_name}</div>
                        <div className={classes.DetailedInfo}>{group_creator_name}, {members[0].length} people</div>
                    </div>
                </div>
                <div className={classes.CreateMemberWrapper}>
                    <div className={classes.GroupMemberText}>Group Members</div>
                    <button className={classes.JoinBtn} onClick={handleJoin}>
                        <img className={classes.JoinIcon} src={CreateIcon} alt="join member icon"/>
                    </button>
                </div>
                <input type="text" value={newMemerId} onChange={handleInputChanged}/>
                <div className={classes.MemberList}>
                {members[0].map((member) => {
                    return (
                        <div className={classes.MemberWrapper} key={member.user_id}>
                            <img className={classes.KickIcon} src={KickIcon} alt="kick icon" onClick={() => handleKick(member.user_id)}/>
                            <div className={classes.MemberInfoWrapper}>
                                <div className={classes.MemberName}>{member.username}</div>
                                <div className={classes.MemberEmail}>{member.email}</div>
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default GroupDetails
