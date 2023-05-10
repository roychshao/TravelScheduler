import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Group = () => {

    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);


    return (
        <div>
            <h1>Group</h1>
        </div>
    )
}

export default Group
