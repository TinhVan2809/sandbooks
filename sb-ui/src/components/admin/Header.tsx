import { NavLink } from "react-router-dom";
import { logout } from "../../services/api";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const result = await logout();
            if(result.success) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="border-b border-[#e4e0d6] bg-[#fffdf8] px-5 py-4 sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
                <NavLink to="/admin" className="text-lg font-semibold tracking-tight text-[#1a1814]">SandBooks <span className="text-[#8b6b43]">/ Admin</span></NavLink>
                <div className="">
                    <NavLink to="/admin/books/create" className="rounded-lg bg-[#3a5740] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-90">+ Thêm sách</NavLink>
                    <button onClick={handleLogout} className="ml-4 rounded-lg bg-[#c95c5c] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-90">
                        Đăng xuất
                    </button>
                </div>

            </div>
        </header>
    );
}

export default Header;