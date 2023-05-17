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

    useEffect(() => {
        if(localStorage.getItem("user_id") === null) {
            navigate('/');
        }
    }, [navigate])

    window.addEventListener("storage", (e) => {
        if(e.key === "user_id" && e.newValue != null) {
            navigate('/catalog/travel');
        }
    })

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
