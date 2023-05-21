import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import CreateTravel from './component/CreateTravel';
import TravelList from './component/TravelList';
const Travel = () => {

    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);

    return (
        <div>
            <p>Travel</p>
            <br />
            <br />
            <CreateTravel />
            {/* <TravelList /> */}
        </div>
    )
}

export default Travel
