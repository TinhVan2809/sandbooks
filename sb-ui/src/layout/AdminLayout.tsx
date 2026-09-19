import { Outlet } from "react-router-dom";
import Header from "../components/admin/Header";
import Footer from "../components/admin/Footer";
function AdminLayout() {
    return (
        <div className="">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default AdminLayout;