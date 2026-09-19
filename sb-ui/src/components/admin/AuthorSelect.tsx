import { useEffect, useState } from "react";
import { getAuthors } from "../../services/api";
import type { CatalogItem } from "../../services/type";

type AuthorSelectProps = {
  value: string;
  onChange: (id: string) => void;
};

function AuthorSelect({ value, onChange }: AuthorSelectProps) {
  const [authors, setAuthors] = useState<CatalogItem[]>([]);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getAuthors()
      .then((response) => setAuthors(response.data.items))
      .catch(() => setError("Không thể tải danh sách tác giả."));
  }, []);

  return (
    <div>
      <span className="field-label">Tác giả *</span>
      <div className="flex gap-2">
        <input readOnly value={authors.find((author) => String(author.id) === value)?.name || ""} placeholder="Chọn tác giả" className="field-input" />
        <button type="button" onClick={() => setIsOpen(true)} className="whitespace-nowrap rounded-lg bg-[#3a5740] px-4 text-sm font-semibold text-white">Chọn</button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1814]/45 p-5" onMouseDown={(event) => event.target === event.currentTarget && setIsOpen(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="author-dialog-title" className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 id="author-dialog-title" className="text-xl font-semibold">Chọn tác giả</h2>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Đóng danh sách tác giả" className="icon-button">×</button>
            </div>
            {error ? <p className="text-sm text-[#9b3f32]">{error}</p> : (
              <div className="max-h-[55vh] space-y-2 overflow-y-auto">
                {authors.length === 0 && <p className="py-3 text-sm text-[#746e65]">Đang tải tác giả...</p>}
                {authors.map((author) => (
                  <button type="button" key={author.id} onClick={() => { onChange(String(author.id)); setIsOpen(false); }} className={`block w-full rounded-md px-3 py-2 text-left text-sm transition ${value === String(author.id) ? "bg-[#3a5740] font-semibold text-white" : "text-[#302c26] hover:bg-[#f0eee7]"}`}>
                    {author.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthorSelect;