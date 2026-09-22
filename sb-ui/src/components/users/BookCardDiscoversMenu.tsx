import { RiBookmarkLine } from "@remixicon/react";
import { getImageUrl } from "../../services/api";
import { type Book } from "../../services/type";
import StarRating from "./StartRating";
import { Link } from "react-router-dom";

function BookCardDiscoverMenu({ book, loading }: { book: Book[]; loading: boolean }) {
    if (loading) {
        return (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5" aria-label="Đang tải sách" aria-busy="true">
                {Array.from({ length: 10 }, (_, index) => (
                    <div key={index} className="animate-pulse overflow-hidden rounded border border-border bg-white">
                        <div className="aspect-2/3 bg-gray-200" />
                        <div className="space-y-2 p-3">
                            <div className="h-2.5 w-1/3 rounded bg-gray-200" />
                            <div className="h-4 w-4/5 rounded bg-gray-200" />
                            <div className="h-4 w-3/5 rounded bg-gray-200" />
                            <div className="mt-2 h-3 w-1/4 rounded bg-gray-200" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            {book?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
                    {book.map((b) => (
                        <div className="group bg-card border border-border rounded overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer" key={b.id}>
                            <div className="aspect-2/3 bg-secondary overlow-hidden relative">
                                <img src={getImageUrl(b.thumbnailUrl)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <button className="absolute top-2 right-2 w-7 h-7 rounded flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary"><RiBookmarkLine size={15} /></button>
                            </div>
                            <div className="p-3">
                                <p className="text-[10px] font-medium text-accent uppercase tracking-wider mb-1">{b.category?.name || "Khác"}</p>
                                <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 mb-0.5">{b.title}</h3>
                                <p className="text-xs text-muted-foreground">{b.author?.name || "Đang cập nhật"}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <StarRating rating={b.rating || 0} />
                                    <span className="text-xs font-medium text-slate-700">
                                        {b.rating ? b.rating.toFixed(1) : "0.0"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : <p>Chưa có sách nào. <Link to="/discover" className="text-primary hover:underline">Khám phá sách</Link>s</p>}
        </>
    )
}

export default BookCardDiscoverMenu;