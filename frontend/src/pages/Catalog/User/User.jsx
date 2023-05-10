import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { loggedoutwithgoogle } from './../../../actions/loginAction.js'
import { Button } from '@mui/material';
import CreateGroup from './component/CreateGroup.jsx';
import GroupList from './component/GroupList.jsx';

const User = () => {

    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);
    const displayName = useSelector(state => state.loginReducer.displayName);
    const email = useSelector(state => state.loginReducer.email);
    const photoURL = useSelector(state => state.loginReducer.photoURL);
    const userId = useSelector(state => state.loginReducer.userId);

    const handleLogout = () => {
        // 確認是在登入狀態
        if(displayName && email && photoURL) {
            dispatcher(loggedoutwithgoogle());
            const auth = getAuth();
            signOut(auth).then(() => {
                console.log("successfully logout");
                navigate('/');
            }).catch((err) => {
                console.log("err: " + err.message);
            })
        } else {
            navigate('/');
        }
    }

    return (
        <div>
            <img src={photoURL} alt="user photo"/>
            <p>{displayName}</p>
            <p>{email}</p>
            <p>{userId}</p>
            <Button variant="contained" onClick={handleLogout}>logout</Button>
            <br/>
            <br/>
            <CreateGroup/>
            <GroupList/>
        </div>
    )
}

export default User
