import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import BookCard from "../../components/users/BookCard";
import { search } from "../../services/api";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const { data, isPending, isError } = useQuery({
    queryKey: ["books", "search", query],
    queryFn: () => search(query),
    enabled: query.length > 0,
  });
  const books = data?.data.items ?? [];

  return (
    <section className="mx-auto min-h-[60vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-border pb-5">
        <p className="text-xs font-semibold uppercase text-[#6b7568]">Kết quả tìm kiếm</p>
        <h1 className="mt-2 text-2xl font-semibold text-[#18181a]">“{query}”</h1>
      </div>
      {isPending && <p role="status" className="text-sm text-muted-foreground">Đang tìm sách...</p>}
      {isError && <p role="alert" className="text-sm text-red-700">Không thể tải kết quả tìm kiếm. Vui lòng thử lại.</p>}
      {!isPending && !isError && books.length > 0 && <BookCard books={books} />}
      {!isPending && !isError && books.length === 0 && (
        <p className="text-sm text-muted-foreground">Không tìm thấy sách phù hợp.</p>
      )}
    </section>
  );
}

export default SearchResults;
