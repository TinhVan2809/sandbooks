import { useEffect, useState } from "react";
import { getBooksSavedByUser } from "../../services/api";
import type { Book } from "../../services/type";
import BookCardDiscoverMenu from "./BookCardDiscoversMenu";
function BooksSave() {

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleFetchBooksSave = async () => {
            try {
                const result = await getBooksSavedByUser();
                if (result.success) {
                    setBooks(result.data.items);
                }
            } catch (_err) {
                console.error("Error fetching list books", _err);
            } finally {
                setLoading(false);
            }
        }
        handleFetchBooksSave();
    }, []);

  return (
    <div>
            <BookCardDiscoverMenu book={books} loading={loading} />
    </div>
  );
}

export default BooksSave;