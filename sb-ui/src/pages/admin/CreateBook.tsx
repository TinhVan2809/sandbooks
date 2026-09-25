import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createBook } from "../../services/api";
import AuthorSelect from "../../components/admin/AuthorSelect";
import PublisherSelect from "../../components/admin/PublisherSelect";
import CreataAuthor from "./CreateAuhtor";
import CreatePublisher from "./CreatePublisher";

type BookForm = {
  title: string;
  isbn: string;
  authorId: string;
  publisherId: string;
  publisherYear: string;
  language: string;
  description: string;
};

const initialForm: BookForm = {
  title: "",
  isbn: "",
  authorId: "",
  publisherId: "",
  publisherYear: "",
  language: "",
  description: "",
};

const toOptionalNumber = (value: string) => (value.trim() ? Number(value) : undefined);

function CreateBook() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
    setIsCreated(false);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImages(Array.from(event.target.files || []));
    setError("");
  };

  const removeImage = (index: number) => {
    setImages((current) => current.filter((_, imageIndex) => imageIndex !== index));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsCreated(false);

    if (!form.title.trim() || !form.isbn.trim()) {
      setError("Vui lòng nhập tên sách và ISBN.");
      return;
    }

    if (!form.authorId.trim()) {
      setError("Vui lòng chọn tác giả.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      isbn: form.isbn.trim(),
      authorId: toOptionalNumber(form.authorId),
      publisherId: toOptionalNumber(form.publisherId),
      publisherYear: toOptionalNumber(form.publisherYear),
      language: form.language.trim() || undefined,
      description: form.description.trim() || undefined,
    };

    setIsSubmitting(true);
    try {
      await createBook(payload, images);
      setForm(initialForm);
      setImages([]);
      setIsCreated(true);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Không thể tạo sách.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-[#f8f6f1] px-5 py-10 text-[#1a1814] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8b6b43]">Kho sách / Quản trị</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Thêm sách mới</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#746e65]">Bổ sung một đầu sách vào kho SandBooks với thông tin xuất bản và hình ảnh đại diện.</p>
          </div>
          <Link to="/admin" className="text-sm font-semibold text-[#3a5740] hover:underline">← Về dashboard</Link>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <section className="rounded-2xl border border-[#e4e0d6] bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7 border-b border-[#eeeae2] pb-5">
              <h2 className="text-lg font-semibold">Thông tin sách</h2>
              <p className="mt-1 text-sm text-[#746e65]">Các trường có dấu * là bắt buộc.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="field-label">Tên sách *</span>
                <input required maxLength={255} name="title" value={form.title} onChange={handleChange} className="field-input" placeholder="Ví dụ: Nhà giả kim" />
              </label>
              <label>
                <span className="field-label">ISBN *</span>
                <input required maxLength={50} name="isbn" value={form.isbn} onChange={handleChange} className="field-input" placeholder="978-..." />
              </label>
              <label>
                <span className="field-label">Năm xuất bản</span>
                <input type="number" min="1000" max="9999" name="publisherYear" value={form.publisherYear} onChange={handleChange} className="field-input" placeholder="2026" />
              </label>
              <AuthorSelect value={form.authorId} onChange={(authorId) => setForm((current) => ({ ...current, authorId }))} />
              <PublisherSelect value={form.publisherId} onChange={(publisherId) => setForm((current) => ({ ...current, publisherId }))} />
              <label>
                <span className="field-label">Ngôn ngữ</span>
                <input maxLength={100} name="language" value={form.language} onChange={handleChange} className="field-input" placeholder="Tiếng Việt" />
              </label>
              <label className="sm:col-span-2">
                <span className="field-label">Mô tả</span>
                <textarea name="description" value={form.description} onChange={handleChange} rows={6} className="field-input resize-y" placeholder="Tóm tắt nội dung hoặc thông tin đáng chú ý..." />
              </label>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-[#e4e0d6] bg-[#fffdf8] p-6 shadow-sm">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Ảnh bìa</h2>
                  <p className="mt-1 text-sm leading-5 text-[#746e65]">Ảnh đầu tiên sẽ được dùng làm thumbnail.</p>
                </div>
                <span className="rounded-full bg-[#e8efe7] px-3 py-1 text-xs font-semibold text-[#3a5740]">Tuỳ chọn</span>
              </div>
              <label className="block cursor-pointer rounded-xl border border-dashed border-[#cfc8bb] bg-white px-4 py-6 text-center transition hover:border-[#3a5740]">
                <span className="text-sm font-semibold text-[#3a5740]">Chọn ảnh từ máy tính</span>
                <span className="mt-1 block text-xs text-[#746e65]">JPG, PNG, WEBP hoặc GIF</span>
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={handleImageChange} className="sr-only" />
              </label>
              <div className="mt-4 space-y-2">
                {images.map((image, index) => (
                  <div key={`${image.name}-${image.lastModified}`} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm">
                    <span className="min-w-0 flex-1 truncate text-[#302c26]">{index === 0 && <strong className="mr-1 text-[#8b6b43]">Thumbnail</strong>}{image.name}</span>
                    <button type="button" onClick={() => removeImage(index)} aria-label={`Xóa ảnh ${image.name}`} className="icon-button">×</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-[#3a5740] p-6 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9d8c5]">Sẵn sàng xuất bản</p>
              <h2 className="mt-3 text-xl font-semibold">Lưu đầu sách vào kho</h2>
              <p className="mt-2 text-sm leading-6 text-[#dce7d9]">Thông tin sẽ được kiểm tra trước khi tạo. Bạn có thể chỉnh sửa dữ liệu sau.</p>
              {error && <p role="alert" className="mt-5 rounded-lg bg-[#9b3f32] px-3 py-2 text-sm">{error}</p>}
              {isCreated && <p role="status" className="mt-5 rounded-lg bg-[#d9ead5] px-3 py-2 text-sm font-medium text-[#294b30]">Đã tạo sách thành công.</p>}
              <button disabled={isSubmitting} type="submit" className="mt-6 w-full rounded-lg bg-white px-4 py-3 text-sm font-semibold text-[#3a5740] transition hover:bg-[#f2f5ef] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Đang lưu..." : "Tạo sách"}</button>
              {isCreated && <button type="button" onClick={() => navigate("/admin")} className="mt-3 w-full text-sm font-medium text-[#dce7d9] hover:text-white">Quay lại dashboard</button>}
            </section>

            <div className="flex flex-col gap-5">
              <section className="rounded-2xl bg-[#3a5740] p-6 text-white shadow-sm" >
                <CreataAuthor />
              </section>
              <section className="rounded-2xl bg-[#3a5740] p-6 text-white shadow-sm" >
                <CreatePublisher />
              </section>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default CreateBook;
