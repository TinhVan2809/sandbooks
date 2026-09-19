import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="border-b border-[#e4e0d6] bg-[#fffdf8] px-5 py-4 sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
                <Link to="/admin" className="text-lg font-semibold tracking-tight text-[#1a1814]">SandBooks <span className="text-[#8b6b43]">/ Admin</span></Link>
                <Link to="/admin/books/create" className="rounded-lg bg-[#3a5740] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-90">+ Thêm sách</Link>
            </div>
        </header>
    );
}

export default Header;