import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import CreateTravel from './component/CreateTravel';
import DeleteTravel from './component/DeleteTravel';
import TravelList from './component/TravelList';
import EditTravel from './component/EditTravel';

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

            <br />
            <br />

            {/* <EditTravel /> */}

            <br />
            <br />

            {/* <DeleteTravel /> */}
            <TravelList />
        </div>
    )
}

export default Travel