import { useEffect, useState } from "react";
import Search from "../../components/users/Search";
import { getListBooks } from "../../services/api";
import { type Book } from "../../services/type";
import { RiLayoutGridLine, RiListUnordered, RiStarFill, RiBookmarkLine } from "@remixicon/react";
import { API_IMG_URL } from "../../services/api";

function BookCardDiscoverMenu({ book }: { book: Book[] }) {
    return (
        <>
            {book?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
                    {book.map((b) => (
                        <div className="group bg-card border border-border rounded overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer" key={b.id}>
                            <div className="aspect-[2/3] bg-secondary overlow-hidden relative">
                                <img src={b.thumbnailUrl ? `${API_IMG_URL}${b.thumbnailUrl}` : "/placeholder.jpg"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <button className="absolute top-2 right-2 w-7 h-7 rounded flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary"><RiBookmarkLine size={15} /></button>
                            </div>
                            <div className="p-3">
                                <p className="text-[10px] font-medium text-accent uppercase tracking-wider mb-1">{b.category?.name || "Khác"}</p>
                                <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 mb-0.5">{b.title}</h3>
                                <p className="text-xs text-muted-foreground">{b.author?.name}r</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <RiStarFill className="w-3.5 h-3.5 text-[#84ac51]" />
                                    <span className="text-xs font-medium text-slate-700">
                                        {b.rating ? b.rating.toFixed(1) : "0.0"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : "Không có sách nào."}
        </>
    )
}

function BookCardDiscoverMenuList({ book }: { book: Book[] }) {
    return (
        <>
            {book?.length > 0 ? (
                <div className="flex flex-col border-t border-border mt-4">
                    {book.map((b) => (
                        <div className="flex items-start py-5 border-b border-border bg-white hover:bg-slate-50 transition-colors group" key={b.id}>
                            {/* Thumbnail */}
                            <div className="w-12 sm:w-16 h-16 sm:h-24 shrink-0 mr-4 rounded overflow-hidden shadow-sm border border-border">
                                <img 
                                    src={b.thumbnailUrl ? `${API_IMG_URL}${b.thumbnailUrl}` : "/placeholder.jpg"} 
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

    const [books, setBooks] = useState<Book[]>([]);
    const [total, setTotal] = useState<number | null>(null);

    const [isDisplay, setIsDisplay] = useState("menu");

    useEffect(() => {
        const handleFetchListBooks = async () => {
            try {
                const result = await getListBooks();
                if (result.success) {
                    setBooks(result.data.items);
                    setTotal(result.data?.pagination?.total || 0);
                }
            } catch (_err) {
                console.error("Error fetching list books", _err);
            }
        }
        handleFetchListBooks();
    }, []);

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
                        <span>{total} books found</span>
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
                    <BookCardDiscoverMenu book={books} />
                )}
                {isDisplay === "list" && (
                    <BookCardDiscoverMenuList book={books} />
                )}
            </div>
        </>
    );
}

export default Discover;