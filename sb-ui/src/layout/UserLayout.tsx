import { Outlet } from "react-router-dom";
import Header from "../components/users/Header";
import Footer from "../components/users/Footer";
function UserLayout() {
    return (<div className="">
        <Header />
        <Outlet />
        <Footer />
    </div>)
}

export default UserLayout;