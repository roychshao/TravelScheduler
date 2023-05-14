import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';


const Spot = () => {

    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);

    const data = {
        success: true,
        message: "",
        data: {
            spots: [
                {
                    spot_id: "1",
                    spot_name: "A",
                    spot_star: true,
                },
                {
                    spot_id: "2",
                    spot_name: "B",
                    spot_star: true,
                },
                {
                    spot_id: "3",
                    spot_name: "C",
                    spot_star: false,
                },
                {
                    spot_id: "4",
                    spot_name: "D",
                    spot_star: true,
                },
            ]
        }
    }
    const starredSpots = data.data.spots.filter((spot) => spot.spot_star);

    return (
        <div>
            <p>去過的地點</p>
            <Button variant="contained" >123</Button>

            <p>想去的地點</p>
            {data.data.spots.map((spot) => <Button variant="contained" key={spot.spot_id} style={{ margin: '0.5rem' }} >{spot.spot_name}</Button>)}
            <p>收藏的地點</p>
            {starredSpots.map((spot) => (
                <>
                    <Button variant="contained" key={spot.spot_id} style={{ margin: '0.5rem' }} >{spot.spot_name}</Button>
                    <br />
                </>
            ))}



            <ul>
                {starredSpots.map((spot) => <li key={spot.spot_id}>{spot.spot_name}</li>)}
            </ul>

        </div>
    )
}

export default Spot
