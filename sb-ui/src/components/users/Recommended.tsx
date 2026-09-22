import { useEffect, useState } from "react";
import { getRecommendedBooks, getImageUrl, getNewestBooks } from "../../services/api";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import { type Book } from "../../services/type";
import SaveBookButton from "./SaveBookButton";
import StarRating from "./StartRating";

function Card({ card, loading }: { card: Book[]; loading: boolean }) {
    if (loading) {
        return (
            <div className="flex gap-4" aria-label="Đang tải sách" aria-busy="true">
                {Array.from({ length: 4 }, (_, index) => (
                    <div
                        key={index}
                        className="w-40 shrink-0 animate-pulse sm:w-44"
                    >
                        <div className="overflow-hidden rounded-lg border border-[#e3e7df] bg-white">
                            <div className="aspect-2/3 bg-gray-200" />
                            <div className="space-y-2 p-3">
                                <div className="h-2.5 w-1/3 rounded bg-gray-200" />
                                <div className="h-4 w-4/5 rounded bg-gray-200" />
                                <div className="h-4 w-3/5 rounded bg-gray-200" />
                                <div className="mt-3 h-3 w-1/4 rounded bg-gray-200" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            {card?.length > 0 ? (
                <div className="flex gap-4">
                    {card.map((r) => (
                        <div className="group relative w-40 shrink-0 sm:w-44" key={r.id}>
                            <Link to={`/detail/${r.id}`} className="block h-full">
                                <div className="flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-[#e3e7df] bg-white transition-all hover:border-[#98bd63] hover:shadow-sm">
                                    <div className="aspect-2/3 bg-gray-100 overflow-hidden relative">
                                        <img
                                            src={getImageUrl(r.thumbnailUrl)}
                                            alt={r.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-3 flex flex-col flex-1">
                                        <p className="text-[10px] font-medium text-[#84ac51] uppercase tracking-wider mb-1 line-clamp-1">
                                            {r.category?.name || "Khác"}
                                        </p>
                                        <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 mb-1 group-hover:text-[#4d7529] transition-colors">
                                            {r.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 mb-2 font-sans">
                                            {r.author?.name || "Đang cập nhật"}
                                        </p>
                                        <div className="flex items-center gap-1 mt-auto">
                                           <StarRating rating={r.rating || 0} />
                                            <span className="text-xs font-medium text-slate-700">
                                                {r.rating ? r.rating.toFixed(1) : "0.0"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <SaveBookButton
                                bookId={r.id}
                                className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded bg-white/90 text-[#3b661d] opacity-0 backdrop-blur-sm transition-all hover:bg-white group-hover:opacity-100"
                            />
                        </div>
                    ))}
                </div>
            ) : <p className="text-sm text-gray-500 mt-4">Không có sách nào</p>}
        </>
    )
}

function Trending() {
    const [trending, setTrending] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleFetchRecommended = async () => {
            try {
                const result = await getRecommendedBooks();
                if (result.success) {
                    setTrending(result.data.items);
                }
            } catch (_err) {
                console.log("Error fething trending", _err);
            } finally {
                setLoading(false);
            }
        }
        handleFetchRecommended();
    }, []);
    return (
        <div className="">
            <Card card={trending} loading={loading} />
        </div>
    );
}

function NewArrivals() {
    const [newArrivals, setNewArrivals] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleFetchNewArrivals = async () => {
            try {
                const result = await getNewestBooks();
                if (result.success) {
                    setNewArrivals(result.data.items);
                }
            } catch (_err) {
                console.error("Error fetching New Arrivals", _err);
            } finally {
                setLoading(false);
            }
        }
        handleFetchNewArrivals();
    }, []);
    return (
        <div className="">
            <Card card={newArrivals} loading={loading} />
        </div>
    )
}

function Recommended() {

    const [tab, setTab] = useState("trending");


    return (
        <section className="py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                    <div className="flex flex-col gap-y-1">
                        <span className="font-medium text-[#97BC62] uppercase text-sm">Tiếp tục khám phá</span>
                        <span className="font-display text-3xl sm:text-4xl text-[#18181a]">Dành cho bạn</span>
                    </div>
                    <div className="flex items-center gap-3 bg-[#f2f3f1]">
                        <div className="flex items-center gap-1 bg-muted rounded p-1">
                            <button onClick={() => setTab("trending")} className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${tab === "trending" ? "bg-white text-[#18181a] shadow-sm" : "text-muted-foreground hover:text-[#18181a]"}`}>Trending</button>
                            <button onClick={() => setTab("popular")} className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${tab === "popular" ? "bg-white text-[#18181a] shadow-sm" : "text-muted-foreground hover:text-[#18181a]"}`}>Popular</button>
                            <button onClick={() => setTab("newArrivals")} className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${tab === "newArrivals" ? "bg-white text-[#18181a] shadow-sm" : "text-muted-foreground hover:text-[#18181a]"}`}>New Arrivals</button>
                        </div>
                        <div className="hidden sm:flex gap-1">
                            <button className="w-7 h-7 flex items-center justify-center rounded border border-[#18181a]/40 text-[#6b7568] hover:border-[#18181a] hover:text-[#18181a] transition-colors"> <RiArrowLeftSLine /></button>
                            <button className="w-7 h-7 flex items-center justify-center rounded border border-[#18181a]/40 text-[#6b7568] hover:border-[#18181a] hover:text-[#18181a] transition-colors"><RiArrowRightSLine /></button>

                        </div>
                    </div>
                </div>
                <div className="flex gap-4 overflow-x-auto scroll-hidden pb-2 -mx-4 px-4">
                    {tab === "trending" && (
                        <Trending />
                    )}
                    {tab === "newArrivals" && (
                        <NewArrivals />
                    )}
                </div>

            </div>
        </section>
    );
}

export default Recommended;