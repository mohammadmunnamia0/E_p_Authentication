import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SignIn from "../SignIn.jsx/SignIn";


const Home = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;