import { useEffect, useState } from "react";
import { type Book } from "../../services/type";
import { getMostReviewedBooks } from "../../services/api";
import BookCard from "./BookCard";

function CuratedSelection() {

    const [mostReviewedBooks, setMostReviewedBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleGetMostReviewedBooks = async () => {
            try {
                const result = await getMostReviewedBooks();
                if (result.success) {
                    setMostReviewedBooks(result.data.items);
                }
            } catch (_err) {
                console.error("Error fetching most reviewed books", _err);
            } finally {
                setLoading(false);
            }
        };
        handleGetMostReviewedBooks();
    }, []);

    const skeletons = Array.from({ length: 4 }, (_, index) => (
        <div
            key={index}
            className="flex animate-pulse flex-col overflow-hidden rounded border border-[#e3e7df] bg-white shadow-sm"
        >
            <div className="aspect-3/4 w-full bg-gray-200" />
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
                <div className="mb-2 h-3 w-1/2 rounded bg-gray-200" />
                <div className="h-3 w-1/4 rounded bg-gray-200" />
            </div>
        </div>
    ));

    return (
        <section className="py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-[#97bc62] text-xs font-medium">TUYỂN CHỌN</span>
                <p className="text-[#18181a] font-display font-medium text-xl text-foreground">SÁCH NỔI BẬT</p>
                <div className="py-10">

                    {loading ? (
                        <div
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                            aria-label="Đang tải sách"
                            aria-busy="true"
                        >
                            {skeletons}
                        </div>
                    ) : (
                        <BookCard mostReviewedBooks={mostReviewedBooks} />
                    )}

                </div>
            </div>
        </section>
    );
}

export default CuratedSelection;
