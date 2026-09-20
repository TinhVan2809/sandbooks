import { RiSearchLine, RiFilterLine } from "@remixicon/react";

function Search() {
    return (
        <section className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                <span className="block text-xs font-semibold mb-2.5 tracking-widest text-[#6B7568] uppercase">
                    TÌM KIẾM TRONG DANH MỤC
                </span>
                <div className="bg-white border border-[#2c5f2d] rounded-lg focus-within:border-[#2c5f2d] focus-within:ring-2 focus-within:ring-[#2c5f2d]/20 transition-all p-2 sm:p-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                    {/* Ô nhập từ khóa tìm kiếm */}
                    <div className="flex items-center flex-1 min-w-0 px-2 sm:px-4 py-1 sm:py-0">
                        <RiSearchLine size={20} className="text-[#6b7568] shrink-0" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm sách, tác giả, thể loại,..."
                            className="w-full px-3 py-2 sm:py-3.5 text-sm sm:text-base outline-none bg-transparent placeholder:text-gray-400"
                        />
                    </div>

                    {/* Bộ lọc & Nút tìm kiếm */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 px-1 sm:px-3 py-1 sm:py-2 border-t sm:border-t-0 sm:border-l border-gray-200">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-[#6b7568] hover:text-[#2c5f2d] hover:bg-[#eef3ea]/50 rounded transition-colors cursor-pointer"
                        >
                            <RiFilterLine size={18} />
                            <span>Lọc</span>
                        </button>
                        <button
                            type="submit"
                            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-[#2c5f2d] text-white px-5 py-2 sm:py-2.5 text-sm font-medium rounded-md hover:bg-[#234d24] active:bg-[#1b3d1c] transition-colors shrink-0 shadow-sm cursor-pointer"
                        >
                            <RiSearchLine size={16} className="sm:hidden" />
                            <span>Tìm kiếm</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Search;