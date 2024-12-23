import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import SignIn from "../Components/SignIn.jsx/SignIn";
import RegComp from "../Components/RegComp/RegComp";


export const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>,
    children:[
      {
        path:'/signin',
        element:<SignIn></SignIn>
      },
      {
        path:'/register',
        element:<RegComp></RegComp>
      }
    ]
  },
]);