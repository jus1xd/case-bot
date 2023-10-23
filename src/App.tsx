import {Route, Routes} from "react-router-dom";
import Login from "./pages/login.tsx";
import ProtectRoute from "./components/ProtectRoute.tsx";
import Users from "./pages/panels/users.tsx";
import Skins from "./pages/panels/skins.tsx";
import Cases from "./pages/panels/cases.tsx";

function App() {
    return (
        <div className={''}>
            <Routes>
                <Route path={'/*'} element={<ProtectRoute children={<Login/>} authPage={true}/>}/>
                <Route path={'/cases'} element={<ProtectRoute children={<Cases/>}/>}/>
                <Route path={'/skins'} element={<ProtectRoute children={<Skins/>}/>}/>
                <Route path={'/users'} element={<ProtectRoute children={<Users/>}/>}/>
                <Route path={'/vip'} element={<ProtectRoute children={<Users/>}/>}/>
                <Route path={'/youtubers'} element={<ProtectRoute children={<Users/>}/>}/>
            </Routes>
        </div>
    )
}

export default App
