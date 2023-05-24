import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Group from './Group/Group.jsx'
import Travel from './Travel/Travel.jsx'
import User from './User/User.jsx'
import Spot from './Spot/Spot.jsx'
import BottomNavbar from './common/BottomNavbar.jsx'


const Catalog = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        // 延遲查看localStorage, 延遲時顯示空白畫面, 並且只有在從登入頁進入才等待
        const delay = 500;
        const previousPath = location.state?.from;

        if(previousPath === '/') {
            setLoading(true);
            setTimeout(() => {
                if(localStorage.getItem("user_id") === null) {
                    navigate('/');
                }    
            }, delay);
        }
        setLoading(false);
    }, [navigate])

    if(loading) {
        return (
            <div></div>
        )
    } else {
        return (<div>
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
}

export default Catalog
