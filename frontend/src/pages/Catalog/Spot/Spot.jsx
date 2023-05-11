import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';


const Spot = () => {

    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);

    return (
        <div>
            <p>去過的地點</p>
            <Button variant="contained" >123</Button>

            <p>想去的地點</p>
            <Button variant="contained" ></Button>

            <p>收藏的地點</p>
            <Button variant="contained" ></Button>

        </div>
    )
}

export default Spot
