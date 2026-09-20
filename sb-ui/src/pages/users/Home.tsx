import CuratedSelection from "../../components/users/CuratedSelection";
import Search from "../../components/users/Search";

function Home() {
    return (
        <>
            <section className="relative overflow-hidden bg-[#f8f8f6]">
                <div className="inset-0">
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center py-16 lg:py-24">
                            <div className="max-w-xl">
                                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-[#eef3ea] rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#97bc62]"></span>
                                    <span className="text-xs font-medium text-[#2c5f2d] tracking-wide uppercase">Digital Library Platform</span>
                                </div>
                                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-foreground leading-none tracking-tight mb-6">Discover your <em className="not-italic text-[#2c5f2d]">next great</em> read.</h1>
                                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">Access thousands of curated titles across every discipline. Borrow, save, and read at your own pace from anywhere.</p>
                                <div className="flex flex-wrap gap-3">
                                    <button className="inline-flex items-center gap-2 bg-[#2c5f2d] text-white px-6 py-3 text-sm font-medium rounded hover:bg-pine transition-colors">Explore Books</button>
                                    <button className="inline-flex items-center gap-2 bg-white text-foreground px-6 py-3 text-sm font-medium rounded border border-border hover:border-[##2c5f2d] hover:text-[##2c5f2d] transition-colors">Browse Categories</button>
                                </div>
                                <div className="flex gap-8 mt-12 pt-8 border-t border-border">
                                    <div className="">
                                        <div className="font-display text-2xl text-[#2c5f2d]">8,400+</div>
                                        <div className="text-xs text-muted-foreground mt-0.5 tracking-wide uppercase">Titles</div>
                                    </div>
                                    <div className="">
                                        <div className="font-display text-2xl text-[#2c5f2d]">340+</div>
                                        <div className="text-xs text-muted-foreground mt-0.5 tracking-wide uppercase">Authors</div>
                                    </div>
                                    <div className="">
                                        <div className="font-display text-2xl text-[#2c5f2d]">9</div>
                                        <div className="text-xs text-muted-foreground mt-0.5 tracking-wide uppercase">Genres</div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <p>Right</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Search />

            <CuratedSelection />
        </>
    );
}

export default Home;