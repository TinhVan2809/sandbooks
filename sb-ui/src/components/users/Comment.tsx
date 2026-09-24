import { useEffect, useState } from "react";
import { getBookReviews } from "../../services/api";

function Comment({ bookId }) {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const handleFetchBookReviews = async () => {
            try {
                const result = await getBookReviews(bookId);
                if (result.success) {
                    setReviews(result.data.items);
                }

            } catch (_err) {
                console.error("Error fechting book reviews", _err);
            }
        }
        handleFetchBookReviews();
    }, []);

    return (
        <div className="">

            <div className="">
                <p>Bình luận mới nhất</p>
            </div>
            <div className=""></div>
        </div>
    )
}

export default Comment;