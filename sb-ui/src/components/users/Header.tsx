import { Link, NavLink } from "react-router-dom";
import {
    RiSearchLine, RiNotification4Line,
    RiBookmarkLine, RiMenuLine, RiCloseLine, RiUserLine
} from "@remixicon/react";
import { useState } from "react";
import { useAuth } from "../../contexts/useAuth";

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user } = useAuth();

    const mobileNavClassName = ({ isActive }: { isActive: boolean }) =>
        `block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${isActive ? "bg-[#e8f0e6] text-[#2c5f2d]" : "text-[#6B5768] hover:bg-[#f8f8f6] hover:text-[#2c5f2d]"
        }`;

    return (
        <header className="bg-white sticky top-0 z-50 border-b border-stone-500/10">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full flex items-center justify-between h-14">
                    <Link to="/" className="flex items-center gap-1 cursor-pointer">
                        <img src="/SANDBOOKS.png" alt="SandBooks" className="h-8 w-8 rounded-xl object-cover" />
                        <span className="font-display text-base tracking-tight text-[#18181a] sm:text-lg">SandBooks</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-1">

                        <NavLink to={"/"} className={({ isActive }) => `px-3 py-1.5 text-sm rounded transition-colors ${isActive ? "text-[#2c5f2d]" : "text-[#6B5768]"} hover:text-[#2c5f2d] font-medium`}>Home</NavLink>
                        <NavLink to={"/discovery"} className={({ isActive }) => `px-3 py-1.5 text-sm rounded transition-colors ${isActive ? "text-[#2c5f2d]" : "text-[#6B5768]"} hover:text-[#2c5f2d] font-medium`}>Khám phá</NavLink>
                        <NavLink to={"/categories"} className={({ isActive }) => `px-3 py-1.5 text-sm rounded transition-colors ${isActive ? "text-[#2c5f2d]" : "text-[#6B5768]"} hover:text-[#2c5f2d] font-medium`}>Thể loại</NavLink>
                        <NavLink to={"/my-library"} className={({ isActive }) => `px-3 py-1.5 text-sm rounded transition-colors ${isActive ? "text-[#2c5f2d]" : "text-[#6B5768]"} hover:text-[#2c5f2d] font-medium`}>My Library</NavLink>

                    </nav>
                    <div className="hidden md:flex items-center gap-2">
                        <button className="p-2 rounded hover:bg-[#f8f8f6]"><RiSearchLine size={20} className="text-[#6B5768] hover:text-[#18181a]" /></button>
                        <button className="p-2 rounded hover:bg-[#f8f8f6]"><RiNotification4Line size={20} className="text-[#6B5768] hover:text-[#18181a]" /></button>
                        <button className="p-2 rounded hover:bg-[#f8f8f6]"><RiBookmarkLine size={20} className="text-[#6B5768] hover:text-[#18181a]" /></button>
                        <NavLink to={user ? "/profile" : "/login"} aria-label={user ? "Mở hồ sơ" : "Đăng nhập"} className="rounded-full border bg-primary p-1 text-white"><RiUserLine size={20} /></NavLink>
                    </div>
                    <button
                        type="button"
                        aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
                        className="rounded-lg p-2 hover:bg-[#f8f8f6] md:hidden"
                    >
                        {isMobileMenuOpen ? <RiCloseLine size={22} className="text-[#6B5768]" /> : <RiMenuLine size={22} className="text-[#6B5768]" />}
                    </button>
                </div>
            </div>
            <div className={`${isMobileMenuOpen ? "block" : "hidden"} border-t border-stone-500/10 bg-white md:hidden`}>
                <div className="space-y-1 px-4 py-3 sm:px-6">
                    <label className="mb-3 flex items-center gap-2 rounded-lg bg-[#f8f8f6] px-3 py-2.5">
                        <RiSearchLine size={18} className="shrink-0 text-[#6B5768]" />
                        <input aria-label="Tìm kiếm sách và tác giả" placeholder="Tìm sách, tác giả..." className="min-w-0 flex-1 bg-transparent text-sm text-[#18181a] outline-none placeholder:text-[#8b8290]" />
                    </label>
                    <NavLink to="/" className={mobileNavClassName} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/discovery" className={mobileNavClassName} onClick={() => setIsMobileMenuOpen(false)}>Khám phá</NavLink>
                    <NavLink to="/categories" className={mobileNavClassName} onClick={() => setIsMobileMenuOpen(false)}>Thể loại</NavLink>
                    <NavLink to="/my-library" className={mobileNavClassName} onClick={() => setIsMobileMenuOpen(false)}>My Library</NavLink>
                    <NavLink to={user ? "/profile" : "/login"} aria-label={user ? "Mở hồ sơ" : "Đăng nhập"} className={mobileNavClassName} onClick={() => setIsMobileMenuOpen(false)}>
                        <div className="flex items-center gap-2">
                            <RiUserLine size={20} />
                            <span>{user ? "Hồ sơ" : "Đăng nhập"}</span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default Header;