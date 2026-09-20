import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-[#1a3a1b] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px8 pt-14 pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    <div className="lg:col-span-1">
                        <div className="flex flex-col">
                        <span className="font-display text-xl mb-4">Sandbooks</span>
                        <p className="text-sm text-white/60 leading-relaxed mb-5">A modern digital library platform for discovering, organizing, and reading books that matter</p>
                        <div className="flex gap-3">
                            <button className="w-8 h-8 rounded-md border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-colors text-xs font-medium">T</button>
                            <button className="w-8 h-8 rounded-md border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-colors text-xs font-medium">I</button>
                            <button className="w-8 h-8 rounded-md border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-colors text-xs font-medium">L</button>
                        </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Platform</p>
                        <ul className="space-y-2.5">
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/discovery">Discover Books</Link></li>
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/categories">Browse Categories</Link></li>
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/my-library">My Library</Link></li>
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/borrowing-history">Borrowing History</Link></li>
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/new-arrivals">New Arrivals</Link></li>
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/trending">Trending</Link></li>
                        </ul>
                    </div>
                    <div className="lg:col-span-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Categories</p>
                        <ul className="space-y-2.5">
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/categories/fiction">Fiction</Link></li>
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/categories/literature">Literature</Link></li>
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/categories/science">Science</Link></li>
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/categories/technology">Technology</Link></li>
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/categories/business">Business</Link></li>
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/categories/psychology">Psychology</Link></li>
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/categories/history">History</Link></li>
                            <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/categories/philosophy">Philosophy</Link></li>
                        </ul>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="">
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">Support</p>
                            <ul className="space-y-2.5">
                                <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/help-center">Help Center</Link></li>
                                <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/contact">Contact Us</Link></li>
                                <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/about">About Librarium</Link></li>
                                <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/privacy">Privacy Policy</Link></li>
                                <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/terms">Terms of Service</Link></li>
                                <li><Link className="text-sm text-white/60 hover:text-white transition-colors" to="/cookies">Cookie Policy</Link></li>
                            </ul>
                        </div>
                        <div className="mt-6 pt-5 border-t border-white/10">
                            <p className="text-xs text-white/40 mb-1">Contact</p>
                            <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">tinhlu2809@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-white/40">© 2026 Librarium. All rights reserved.</p>
                    <span className="text-xs text-white/30">Designed for readers</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;