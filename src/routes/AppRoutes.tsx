import {Routes, Route, Navigate} from 'react-router-dom'

import StallsPage from '../pages/StallsPage'
import MenuPage from '../pages/MenuPage'
import OrdersPage from '../pages/OrdersPage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/stalls" />} />
            <Route path="/stalls" element={<StallsPage />} />
            <Route path="/menu/:stallId" element={<MenuPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            {/* <Route path="/stalls" element={<StallsPage />} /> */}
        </Routes>
    )
}

export default AppRoutes