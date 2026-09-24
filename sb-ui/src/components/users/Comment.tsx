import { useEffect, useState } from "react";
import { createReview, getBookReviews } from "../../services/api";
import type { Review } from "../../services/type";
import StarRating from "./StartRating";

import { RiStarFill } from "@remixicon/react";

interface CommentProps {
    bookId?: number | string;
}

interface RatingProps {
    rating: number;
    setRating: (rating: number) => void;
}

function Rating({ rating, setRating }: RatingProps) {
    return (
        <>
            <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <RiStarFill
                        key={star}
                        onClick={() => setRating(star)}
                        color={star <= rating ? "#facc15" : "#d1d5db"}
                    />
                ))}
            </div>
        </>
    );
}

function Comment({ bookId }: CommentProps) {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        if (!bookId) return;

        const handleFetchBookReviews = async () => {
            try {
                const result = await getBookReviews(bookId);
                if (result.success && Array.isArray(result.data?.items)) {
                    setReviews(result.data.items);
                } else {
                    setReviews([]);
                }
            } catch (_err) {
                console.error("Error fetching book reviews", _err);
                setReviews([]);
            }
        };

        handleFetchBookReviews();
    }, [bookId]);


    const [rating, setRating] = useState(0);

    // Comment form data 
    const [formData, setFormData] = useState({
        comment: "",
    });

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookId) return;
        try {
            const result = await createReview({
                bookId: Number(bookId),
                rating: rating,
                comment: formData.comment
            });
            if (result.success) {
                // Clear form
                setFormData({ comment: "" });
                setRating(0);

                // Refetch reviews
                const newReviews = await getBookReviews(bookId);
                if (newReviews.success && Array.isArray(newReviews.data?.items)) {
                    setReviews(newReviews.data.items);
                }
            }
        } catch (_err) {
            console.error("error submit comment", _err);
        }
    };

    return (
        <div className="">
            <div className="flex flex-col mb-5">
                <p className="text-xl font-display uppercase text-primary">Bình luận</p>
                <span className="text-sm">Các đánh giá gần đây</span>
            </div>
            <div className="mb-5 bg-white px-5 py-10 rounded">
                <Rating rating={rating} setRating={setRating} />
                <form className="flex items-center" onSubmit={handleSubmitComment}>
                    <div className="border border-border flex items-center py-2 flex-1">
                        <input type="text" placeholder="Nhập bình luận của bạn..." className="flex-1 px-3 py-2 outline-0" name="comment" value={formData.comment} onChange={(e) => setFormData({ comment: e.target.value })} />
                    </div>
                    <button className="bg-primary h-full px-6 py-4 text-white cursor-pointer" type="submit">Gửi</button>
                </form>
            </div>
            <div className="bg-white px-5 py-10 rounded">
                {reviews?.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {reviews.map((r) => (
                            <div key={r.reviewId} className="bg-gray-200/50 px-4 py-6 flex flex-col gap-2.5">
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold text-primary">{r.user?.nickname}</span>
                                    <span className=""><StarRating rating={r.rating} /></span>
                                </div>
                                <div className="">
                                    <p>{r.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Chưa có bình luận.</p>
                )}
            </div>
        </div >
    );
}

export default Comment;