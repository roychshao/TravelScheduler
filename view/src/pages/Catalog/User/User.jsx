import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { loggedoutwithgoogle } from './../../../actions/loginAction.js'
import Button from '@mui/material/Button';

const User = () => {
   
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);
    const displayName = useSelector(state => state.loginReducer.displayName);
    const email = useSelector(state => state.loginReducer.email);
    const photoURL = useSelector(state => state.loginReducer.photoURL);
    
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
        }
    }

    return (
        <div>
            <img src={photoURL} alt="user photo"/>
            <p>{displayName}</p>
            <p>{email}</p>
            <Button variant="contained" onClick={handleLogout}>logout</Button>
        </div>
    )
}

export default User
