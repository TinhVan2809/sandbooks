import { useParams } from "react-router-dom";
import { getBookById, getImageUrl } from "../../services/api";
import { RiStarFill, RiStarHalfFill, RiShareLine } from "@remixicon/react"
import { useEffect, useState } from "react";
import type { Book } from "../../services/type";

function StarRating({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.3 && rating - fullStars <= 0.7;
    const roundedUp = rating - fullStars > 0.7;
    const filledStars = Math.min(5, roundedUp ? fullStars + 1 : fullStars);

    return (
        <div className="flex items-center gap-0.5" aria-label={`${rating.toFixed(1)} trên 5 sao`}>
            {Array.from({ length: 5 }, (_, index) => {
                const starNumber = index + 1;

                if (starNumber <= filledStars) {
                    return <RiStarFill key={starNumber} className="h-4 w-4 fill-[#84ac51] text-[#84ac51]" />;
                }

                if (starNumber === filledStars + 1 && hasHalfStar) {
                    return <RiStarHalfFill key={starNumber} className="h-4 w-4 fill-[#84ac51] text-[#84ac51]" />;
                }

                return <RiStarFill key={starNumber} className="h-4 w-4 fill-[#e5e7eb] text-[#e5e7eb]" />;
            })}
        </div>
    );
}

function Detail() {

    const { bookId } = useParams<{ bookId: string }>();

    const [detail, setDetail] = useState<Book | null>(null);


    useEffect(() => {
        const fetchBookDetail = async () => {
            if (!bookId) return;
            const bookIdNumber = parseInt(bookId, 10);
            try {
                const response = await getBookById(bookIdNumber);
                if (response.success) {
                    setDetail(response.data.book);
                }
            } catch (error) {
                console.error("Error fetching book detail:", error);
            }
        };

        fetchBookDetail();
    }, [bookId]);

    return (
        <section className="">
            {detail ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
                        <div className="flex flex-col gap-4">
                            <div className="aspect-2/3 bg-secondary rounded overflow-hidden max-w-70     w-full mx-auto lg:mx-0">
                                <img src={getImageUrl(detail.thumbnailUrl)} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-2 max-w-70 mx-auto lg:mx-0 w-full">
                                <button className="w-full rounded bg-[#2c5f2d] py-3 text-sm font-medium text-white transition-colors hover:bg-[#1a3a1b]">Mượn sách</button>
                                <button className="w-full rounded border border-[#e3e7df] py-3 text-sm font-medium text-[#6b7568] transition-colors hover:border-[#2c5f2d] hover:text-[#2c5f2d]">Thêm vào danh sách</button>
                                <button className="w-full rounded border border-[#e3e7df] py-3 text-sm text-[#6b7568] transition-colors hover:border-[#18181a] hover:text-[#18181a] flex items-center justify-center gap-2"><RiShareLine size={18}/> Chia sẽ</button>
                            </div>
                        </div>
                        <div className="flex flex-col">

                            <div className="flex flex-col gap-6">
                                <div className="">
                                    <span className="inline-block px-2.5 py-1 bg-secondary text-primary text-xs font-medium rounded-full mb-3">{detail.category?.name || "Khác"}</span>
                                    <h3 className="font-display text-4xl sm:text-5xl text-foreground leading-tight mb-2">{detail.title}</h3>
                                    <span className="text-lg text-muted-foreground">by {detail.author?.name}</span>
                                </div>
                                <div className="flex items-center justify-between gap-3 mb-6 pb-6 border-b border-border">
                                    <div className="flex items-center gap-2 mt-auto">
                                        <StarRating rating={detail.rating || 0} />
                                        <p className="text-sm font-medium text-slate-700">
                                            <span className="font-medium text-foreground">{detail.rating ? detail.rating.toFixed(1) : "0.0"}</span>
                                            <span className="text-muted-foreground ml-1">({detail.ratingCount} reviews)</span>
                                        </p>
                                    </div>
                                    <div className="ml-auto px-2.5 py-1 rounded-full text-xs font-medium bg-secondary text-primary">
                                        <p>{detail.status}</p>
                                    </div>
                                </div>
                            </div>


                            <div className="mb-8">
                                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Mô tả</h2>
                                <p className="text-muted-foreground leading-relaxed text-base">{detail.description}</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 p-4 bg-white border border-border rounded">
                                <div className="">
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                        <p>Phát hành năm</p>
                                        <p className="text-sm font-medium text-foreground">{detail.publisherYear?.slice(0, 4) || "Chưa cập nhật"}</p>
                                    </div>
                                </div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                    <p>ISBN</p>
                                    <p className="text-sm font-medium text-foreground">{detail.isbn}</p>
                                </div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                    <p>Ngôn ngữ</p>
                                    <p className="text-sm font-medium text-foreground">{detail.language}</p>
                                </div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                    <p>NXB</p>
                                    <p className="text-sm font-medium text-foreground">{detail.publisher?.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Book not found</p>
            )}
        </section>
    );
}

export default Detail;