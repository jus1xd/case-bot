import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {setupStore} from "./store/store.ts";
import moment from "moment";
import 'moment/dist/locale/ru';
moment.locale('ru');

const router = createBrowserRouter([
    {
        path: "/*",
        element: <App />,
    },
]);



const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
