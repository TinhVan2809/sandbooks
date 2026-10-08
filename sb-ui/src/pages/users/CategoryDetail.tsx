import { useEffect, useState } from "react";
import type { Book } from "../../services/type";
import { useParams } from "react-router-dom";
import { getBooksByCategory, getImageUrl } from "../../services/api";

export default function CategoryDetail() {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        if (!categoryId) {
            return;
        }

        const fetchBooks = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await getBooksByCategory(Number(categoryId));
                setBooks(response.data.items);
                if (response.data.items.length > 0) {
                    setCategoryName(response.data.items[0].category?.name || "");
                }
            } catch {
                setError("Không thể tải sách trong thể loại này.");
            } finally {
                setLoading(false);
            }
        };

        void fetchBooks();
    }, [categoryId]);

    return (
        <>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <h2 className="mb-6 text-xl font-semibold text-slate-800">
                    Thể loại: {categoryName || categoryId}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p role="alert">{error}</p>
                    ) : books.length > 0 ? (
                        books.map((book) => (
                            <div key={book.id} className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:shadow-md">
                                <div className="aspect-2/3 w-full overflow-hidden">
                                    <img
                                        src={getImageUrl(book.thumbnailUrl)}
                                        alt={book.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col p-4">
                                    <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mb-1">{book.title}</h3>
                                    <p className="text-xs text-slate-500 mb-2">{book.author?.name || "Đang cập nhật"}</p>
                                    <div className="mt-auto flex items-center gap-1">
                                        <span className="text-xs font-medium text-slate-700">
                                            {book.rating ? book.rating.toFixed(1) : "0.0"} / 5
                                        </span>
                                    </div>
                                </div>
                            </div>
                ))
                ) : (
                <p>Không có sách nào trong thể loại này.</p>
        )}
            </div>
        </div >
    </>
  );
}