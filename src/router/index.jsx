import { createBrowserRouter } from 'react-router-dom';

// Component
import Home from '../components/Home';
import Tire from '../components/Tire/index';
import Spec from '../components/Tire/Spec';
import Record from '../components/Record/index';
import Todo from '../components/Todo/Index';
import Csv from '../components/Csv/index';
import Backend, { action as backendAction } from '../components/Backend/index';

// Error page
import ErrorPage from "../components/Error/index";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
        children: [
            {
                // path: "/merchandise",
                // element: <Merchandise />,
                // errorElement: <ErrorPage />,
                // children: [
                //   {
                //     path: "page/:pageN",
                //     element: <Page />,
                //   }
                // ]
            },
            {
                path: "/tire",
                element: <Tire />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: ":area/spec/:inch",
                        element: <Spec />,
                    }
                ]
            },
            {
                path: "/record",
                element: <Record />,
                errorElement: <ErrorPage />,
                // children: [
                //   {
                //     path: ":area/spec/:inch",
                //     element: <Spec />,
                //   }
                // ]
            },
            {
                path: "/todo",
                element: <Todo />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/csv",
                element: <Csv />,
                errorElement: <ErrorPage />,
            }
        ]
    },
    {
        path: "/backend",
        element: <Backend />,
        errorElement: <ErrorPage />,
        action: backendAction,
    }
]);

export default router;