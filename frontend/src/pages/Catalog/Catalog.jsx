import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Group from './Group/Group.jsx'
import Travel from './Travel/Travel.jsx'
import User from './User/User.jsx'
import Spot from './Spot/Spot.jsx'
import BottomNavbar from './common/BottomNavbar.jsx'


const Catalog = () => {
    
    const navigate = useNavigate();
    const loginWithGoogle = useSelector(state => state.loginReducer.loginWithGoogle);
    // const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    useEffect(() => {
        if(!loginWithGoogle) {
            navigate('/');
        }
    }, [loginWithGoogle, navigate])

    return (
        <div>
            <Routes>
                <Route path="/user" element={<User/>}/>
                <Route path="/travel" element={<Travel/>}/>
                <Route path="/spot" element={<Spot/>}/>
                <Route path="/group" element={<Group/>}/>
            </Routes>
            <BottomNavbar/>
        </div>
    )
}

export default Catalog
