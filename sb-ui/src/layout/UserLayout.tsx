import { Outlet } from "react-router-dom";
import Header from "../components/users/Header";
import Footer from "../components/users/Footer";
import ScrollToTop from "../components/users/ScrollToTop";
function UserLayout() {
    return (<div className="bg-[#f8f8f6]">
        <Header />
        <main>
            <Outlet />
            <ScrollToTop/>
        </main>
        <Footer />
    </div>)
}

export default UserLayout;