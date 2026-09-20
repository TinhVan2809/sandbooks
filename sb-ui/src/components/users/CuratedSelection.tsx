import { useEffect, useState } from "react";
import { type Book } from "../../services/type";
import { getMostReviewedBooks } from "../../services/api";
import BookCard from "./BookCard";

function CuratedSelection() {

    const [mostReviewedBooks, setMostReviewedBooks] = useState<Book[]>([]);

    useEffect(() => {
        const handleGetMostReviewedBooks = async () => {
            try {
                const result = await getMostReviewedBooks();
                if (result.success) {
                    setMostReviewedBooks(result.data.items);
                }
            } catch (_err) {
                console.error("Error fetching most reviewed books", _err);
            }
        };
        handleGetMostReviewedBooks();
    }, []);

    return (
        <section className="py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-[#97bc62] text-xs font-medium">TUYỂN CHỌN</span>
                <p className="text-[#18181a] font-display font-medium text-xl text-foreground">SÁCH NỔI BẬT</p>
                <div className="py-10">
                    <BookCard mostReviewedBooks={mostReviewedBooks} />
                </div>
            </div>
        </section>
    );
}

export default CuratedSelection;
