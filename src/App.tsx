import {Route, Routes} from "react-router-dom";
import Login from "./pages/login.tsx";
import ProtectRoute from "./components/ProtectRoute.tsx";
import Users from "./pages/panels/users.tsx";
import Skins from "./pages/panels/skins.tsx";
import Cases from "./pages/panels/cases.tsx";
import Categories from "./pages/panels/categories.tsx";
import Vip from "./pages/panels/vip.tsx";
import Youtuber from "./pages/panels/youtuber.tsx";

function App() {
    return (
        <div className={''}>
            <Routes>
                <Route path={'/*'} element={<ProtectRoute children={<Login/>} authPage={true}/>}/>
                <Route path={'/cases'} element={<ProtectRoute children={<Cases/>}/>}/>
                <Route path={'/skins'} element={<ProtectRoute children={<Skins/>}/>}/>
                <Route path={'/users'} element={<ProtectRoute children={<Users/>}/>}/>
                <Route path={'/categories'} element={<ProtectRoute children={<Categories/>}/>}/>
                <Route path={'/vip'} element={<ProtectRoute children={<Vip/>}/>}/>
                <Route path={'/youtubers'} element={<ProtectRoute children={<Youtuber/>}/>}/>
            </Routes>
        </div>
    )
}

export default App
