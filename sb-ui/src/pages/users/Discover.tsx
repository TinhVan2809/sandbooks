import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Search from "../../components/users/Search";
import { getImageUrl } from "../../services/api";
import { bookListQueryOptions, useBooks } from "../../hooks/useBooks";
import { type Book } from "../../services/type";
import BookCardDiscoverMenu from "../../components/users/BookCardDiscoversMenu";
import { RiLayoutGridLine, RiListUnordered, RiStarFill } from "@remixicon/react";

function BookCardDiscoverMenuList({ book, loading }: { book: Book[]; loading: boolean }) {
    if (loading) {
        return (
            <div className="mt-4 flex flex-col border-t border-border" aria-label="Đang tải sách" aria-busy="true">
                {Array.from({ length: 6 }, (_, index) => (
                    <div key={index} className="flex animate-pulse items-start border-b border-border py-5">
                        <div className="mr-4 h-16 w-12 shrink-0 rounded bg-gray-200 sm:h-24 sm:w-16" />
                        <div className="min-w-0 flex-1 space-y-2 pr-4">
                            <div className="h-4 w-3/5 rounded bg-gray-200" />
                            <div className="h-3 w-2/5 rounded bg-gray-200" />
                            <div className="h-3 w-full rounded bg-gray-200" />
                            <div className="h-3 w-4/5 rounded bg-gray-200" />
                        </div>
                        <div className="hidden h-3 w-16 rounded bg-gray-200 sm:block" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            {book?.length > 0 ? (
                <div className="flex flex-col border-t border-border mt-4">
                    {book.map((b) => (
                        <div className="flex items-start py-5 border-b border-border bg-white hover:bg-slate-50 transition-colors group" key={b.id}>
                            {/* Thumbnail */}
                            <div className="w-12 sm:w-16 h-16 sm:h-24 shrink-0 mr-4 rounded overflow-hidden shadow-sm border border-border">
                                <img 
                                    src={getImageUrl(b.thumbnailUrl)} 
                                    alt={b.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                            </div>

                            {/* Middle Content */}
                            <div className="flex-1 min-w-0 pr-4">
                                <h3 className="text-sm sm:text-[15px] font-semibold text-foreground mb-0.5 truncate group-hover:text-primary transition-colors">
                                    {b.title}
                                </h3>
                                <p className="text-xs text-muted-foreground mb-1.5 font-sans">
                                    {b.author?.name || "Đang cập nhật"} {b.publisherYear ? `· ${b.publisherYear}` : ""}
                                </p>
                                <p className="text-xs text-muted-foreground line-clamp-1 sm:line-clamp-2 leading-relaxed">
                                    {b.description || "Không có mô tả cho sách này."}
                                </p>
                            </div>

                            {/* Right Section */}
                            <div className="flex items-start gap-4 sm:gap-6 shrink-0 ml-2">
                                {/* Status Badge */}
                                <span className={`hidden sm:inline-block px-2.5 py-0.5 rounded-md text-[10px] font-medium mt-0.5 ${
                                    b.status?.toLowerCase() === 'available' || !b.status 
                                    ? 'bg-secondary text-primary' 
                                    : 'bg-gray-100 text-gray-500'
                                }`}>
                                    {b.status || "Available"}
                                </span>

                                {/* Category & Rating */}
                                <div className="flex flex-col items-end gap-1.5 w-16 sm:w-20">
                                    <span className="text-[11px] text-accent font-medium capitalize truncate w-full text-right">
                                        {b.category?.name || "Khác"}
                                    </span>
                                    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                                        {b.rating ? b.rating.toFixed(1) : "0.0"} 
                                        <RiStarFill className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p className="text-sm text-muted-foreground mt-4">Không có sách nào.</p>}
        </>
    )
}

function Discover() {
    const pageSize = 10;
    const [page, setPage] = useState(1);
    const [isDisplay, setIsDisplay] = useState("menu");
    const queryClient = useQueryClient();
    const { data, isPending } = useBooks(page, pageSize);
    const books = data?.data.items ?? [];
    const total = data?.data.pagination?.total ?? 0;
    const totalPages = data?.data.pagination?.totalPages ?? 1;

    useEffect(() => {
        if (!isPending && page < totalPages) {
            void queryClient.prefetchQuery(bookListQueryOptions(page + 1, pageSize));
        }
    }, [isPending, page, pageSize, queryClient, totalPages]);

    return (
        <>
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <span className="font-display text-[#18181a] text-3xl">KHÁM PHÁ SÁCH</span>
                </div>
                <Search />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center mb-5">
                    <div className="text-sm text-muted-foreground">
                        <span>{isPending ? "Đang tải sách..." : `${total} books found`}</span>
                    </div>
                    <div className="flex gap-3 items-center">
                        <select className="bg-white px-3 py-1">
                            <option value="">Top rate</option>
                            <option value="">Tiêu đề (A - Z)</option>
                            <option value="">Mới nhất</option>
                            <option value="">Most review</option>
                        </select>
                        <div className="flex gap-1">
                            <button onClick={() => setIsDisplay("menu")} className={`p-1.5  ${isDisplay == "menu" ? "bg-primary text-white" : "text-muted-foreground"}`}><RiLayoutGridLine size={18} /></button>
                            <button onClick={() => setIsDisplay("list")} className={`p-1.5  ${isDisplay == "list" ? "bg-primary text-white" : "text-muted-foreground"}`}><RiListUnordered size={18} /></button>
                        </div>
                    </div>
                </div>
                {isDisplay === "menu" && (
                    <BookCardDiscoverMenu book={books} loading={isPending} />
                )}
                {isDisplay === "list" && (
                    <BookCardDiscoverMenuList book={books} loading={isPending} />
                )}
                <div className="mt-6 flex items-center justify-center gap-4" aria-label="Phân trang danh sách sách">
                    <button
                        type="button"
                        onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                        disabled={page <= 1 || isPending}
                        className="rounded border border-border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Trang trước
                    </button>
                    <span className="text-sm text-muted-foreground">Trang {page} / {totalPages}</span>
                    <button
                        type="button"
                        onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
                        disabled={page >= totalPages || isPending}
                        className="rounded border border-border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Trang sau
                    </button>
                </div>
            </div>
        </>
    );
}

export default Discover;