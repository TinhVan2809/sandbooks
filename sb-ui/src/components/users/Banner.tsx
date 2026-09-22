function Banner() {
    return (
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
                        <div className="hidden lg:flex items-end justify-center h-85 gap-1 relative">
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-border"></div>
                            <div
                                className="rounded-t-xs relative shrink-0 transition-transform hover:-translate-y-1"
                                style={{ height: 58, width: 28, backgroundColor: "rgb(44, 95, 45)" }}
                            >
                                <div
                                    className="absolute inset-x-0 top-3 flex items-center justify-center"
                                                                        style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                                >
                                    <div
                                        className="text-[7px] tracking-widest font-medium opacity-40"
                                        style={{ color: "rgb(255, 255, 255)" }}
                                    >
                                        ABCD
                                    </div>
                                </div>
                            </div>
                            <div
                                className="rounded-t-xs relative shrink-0 transition-transform hover:-translate-y-1"
                                style={{ height: 72, width: 20, backgroundColor: "rgb(151, 188, 98)" }}
                            ></div>
                            <div
                                className="rounded-t-xs relative shrink-0 transition-transform hover:-translate-y-1"
                                style={{ height: 48, width: 36, backgroundColor: "rgb(26, 58, 27)" }}
                            >
                                <div
                                    className="absolute inset-x-0 top-3 flex items-center justify-center"
                                                                        style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                                >
                                    <div
                                        className="text-[7px] tracking-widest font-medium opacity-40"
                                        style={{ color: "rgb(255, 255, 255)" }}
                                    >
                                        ABC
                                    </div>
                                </div>
                            </div>
                            <div
                                className="rounded-t-xs relative shrink-0 transition-transform hover:-translate-y-1"
                                style={{ height: 88, width: 24, backgroundColor: "rgb(74, 135, 80)" }}
                            >
                                <div
                                    className="absolute inset-x-0 top-3 flex items-center justify-center"
                                                                        style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                                >
                                    <div
                                        className="text-[7px] tracking-widest font-medium opacity-40"
                                        style={{ color: "rgb(255, 255, 255)" }}
                                    >
                                        ABCDEF
                                    </div>
                                </div>
                            </div>
                            <div
                                className="rounded-t-xs relative shrink-0 transition-transform hover:-translate-y-1"
                                style={{ height: 64, width: 32, backgroundColor: "rgb(197, 217, 160)" }}
                            >
                                <div
                                    className="absolute inset-x-0 top-3 flex items-center justify-center"
                                                                        style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                                >
                                    <div
                                        className="text-[7px] tracking-widest font-medium opacity-40"
                                        style={{ color: "rgb(44, 95, 45)" }}
                                    >
                                        ABCD
                                    </div>
                                </div>
                            </div>
                            <div
                                className="rounded-t-xs relative shrink-0 transition-transform hover:-translate-y-1"
                                style={{ height: 52, width: 18, backgroundColor: "rgb(44, 95, 45)" }}
                            ></div>
                            <div
                                className="rounded-t-xs relative shrink-0 transition-transform hover:-translate-y-1"
                                style={{ height: 80, width: 28, backgroundColor: "rgb(151, 188, 98)" }}
                            >
                                <div
                                    className="absolute inset-x-0 top-3 flex items-center justify-center"
                                                                        style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                                >
                                    <div
                                        className="text-[7px] tracking-widest font-medium opacity-40"
                                        style={{ color: "rgb(255, 255, 255)" }}
                                    >
                                        ABCDE
                                    </div>
                                </div>
                            </div>
                            <div
                                className="rounded-t-xs relative shrink-0 transition-transform hover:-translate-y-1"
                                style={{ height: 44, width: 22, backgroundColor: "rgb(238, 243, 234)" }}
                            >
                                <div
                                    className="absolute inset-x-0 top-3 flex items-center justify-center"
                                                                        style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                                >
                                    <div
                                        className="text-[7px] tracking-widest font-medium opacity-40"
                                        style={{ color: "rgb(44, 95, 45)" }}
                                    >
                                        ABC
                                    </div>
                                </div>
                            </div>
                            <div
                                className="rounded-t-xs relative shrink-0 transition-transform hover:-translate-y-1"
                                style={{ height: 76, width: 30, backgroundColor: "rgb(44, 95, 45)" }}
                            >
                                <div
                                    className="absolute inset-x-0 top-3 flex items-center justify-center"
                                                                        style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                                >
                                    <div
                                        className="text-[7px] tracking-widest font-medium opacity-40"
                                        style={{ color: "rgb(255, 255, 255)" }}
                                    >
                                        ABCDE
                                    </div>
                                </div>
                            </div>
                            <div
                                className="rounded-t-xs relative shrink-0 transition-transform hover:-translate-y-1"
                                style={{ height: 60, width: 16, backgroundColor: "rgb(197, 217, 160)" }}
                            ></div>
                            <div
                                className="rounded-t-xs relative shrink-0 transition-transform hover:-translate-y-1"
                                style={{ height: 92, width: 26, backgroundColor: "rgb(74, 135, 80)" }}
                            >
                                <div
                                    className="absolute inset-x-0 top-3 flex items-center justify-center"
                                                                        style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                                >
                                    <div
                                        className="text-[7px] tracking-widest font-medium opacity-40"
                                        style={{ color: "rgb(255, 255, 255)" }}
                                    >
                                        ABCDEF
                                    </div>
                                </div>
                            </div>
                            <div
                                className="rounded-t-xs relative shrink-0 transition-transform hover:-translate-y-1"
                                style={{ height: 56, width: 20, backgroundColor: "rgb(151, 188, 98)" }}
                            ></div>
                            <div
                                className="absolute bottom-0 left-4 right-4 h-6 bg-linear-to-b from-transparent to-border/30 pointer-events-none"
                            ></div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;