import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const User = () => {
   
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);
    const displayName = useSelector(state => state.userReducer.displayName);
    const email = useSelector(state => state.userReducer.email);
    
    return (
        <div>
            <p>{displayName}</p>
            <p>{email}</p>
        </div>
    )
}

export default User
