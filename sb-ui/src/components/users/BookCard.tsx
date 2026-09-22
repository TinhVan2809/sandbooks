import { Link } from "react-router-dom";
import { RiStarFill, RiStarHalfFill } from "@remixicon/react";
import { getImageUrl } from "../../services/api";
import { type Book } from "../../services/type";
import SaveBookButton from "./SaveBookButton";

interface BookCardProps {
    mostReviewedBooks?: Book[];
    books?: Book[];
}

function StarRating({ rating }: { rating: number }) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.3 && rating - fullStars <= 0.7;
    const extraFullStar = rating - fullStars > 0.7;

    const actualFullStars = extraFullStar ? fullStars + 1 : fullStars;

    for (let i = 1; i <= 5; i++) {
        if (i <= actualFullStars) {
            stars.push(
                <RiStarFill key={i} className="w-3 h-3 text-[#84ac51] fill-[#84ac51]" />
            );
        } else if (i === actualFullStars + 1 && hasHalfStar) {
            stars.push(
                <RiStarHalfFill key={i} className="w-3 h-3 text-[#84ac51] fill-[#84ac51]" />
            );
        } else {
            stars.push(
                <RiStarFill key={i} className="w-3 h-3 text-[#e5e7eb] fill-[#e5e7eb]" />
            );
        }
    }

    return <div className="flex items-center gap-0.5">{stars}</div>;
}

function BookCard({ mostReviewedBooks, books }: BookCardProps) {
    const list = books || mostReviewedBooks || [];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {list.map((book) => (
               
                    <div
                        key={book.id}
                        className="bg-white rounded border border-[#e3e7df] overflow-hidden shadow-sm hover:border-[#98bd63] transition-all duration-300 flex flex-col group"
                    >
                        {/* Thumbnail */}
                        <div className="aspect-3/4 w-full overflow-hidden bg-gray-100 relative">
                            <img
                                src={getImageUrl(book.thumbnailUrl)}
                                alt={book.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Body */}
                        <div className="p-4 flex flex-col flex-1">
                            {/* Title & Bookmark */}
                            <div className="flex items-start justify-between gap-2 mb-1">
                                <h3 className="font-display text-lg text-slate-800 line-clamp-2 leading-snug group-hover:text-[#4d7529] transition-colors">
                                    {book.title}
                                </h3>
                                <SaveBookButton bookId={book.id} className="mt-0.5 shrink-0 text-slate-400 transition-colors hover:text-slate-600" />
                            </div>

                            {/* Author */}
                            <span className="text-sm text-slate-500 mb-3 block font-display">
                                {book.author?.name || "Tác giả chưa cập nhật"}
                            </span>

                            {/* Rating Row */}
                            <div className="flex items-center gap-2 text-sm mb-4 mt-auto">
                                <StarRating rating={book.rating || 0} />
                                <span className="text-slate-700 ml-0.5 text-sm">
                                    {(book.rating || 0).toFixed(1)}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-500 font-display text-sm">
                                    {(book.ratingCount || 0).toLocaleString()} reviews
                                </span>
                            </div>

                            {/* Footer (Status & View Book Link) */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#f0f7ea] text-[#3b661d]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#5d8b32]"></span>
                                    {book.status || "Available"}
                                </span>
                                <Link
                                    to={`/detail/${book.id}`}
                                    className="inline-flex items-center gap-1 font-medium text-[#3b661d] hover:text-[#284813] hover:underline transition-colors text-xs"
                                >
                                    View Book &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
            ))}
        </div>
    );
}

export default BookCard;
