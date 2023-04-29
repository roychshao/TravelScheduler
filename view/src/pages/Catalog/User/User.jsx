import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const User = () => {
   
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);
    const displayName = useSelector(state => state.loginReducer.displayName);
    const email = useSelector(state => state.loginReducer.email);
    const photoURL = useSelector(state => state.loginReducer.photoURL);
    
    return (
        <div>
            <img src={photoURL} alt="user photo"/>
            <p>{displayName}</p>
            <p>{email}</p>
        </div>
    )
}

export default User
