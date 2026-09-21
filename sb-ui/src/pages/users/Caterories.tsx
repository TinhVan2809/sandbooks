import { useEffect, useState } from "react";
import { getCategories } from "../../services/api";
import type { Category } from "../../services/type";

function CategoryCard({ category }: { category: Category }) {
    return (
        <button className="group bg-white p-5 text-left hover:bg-[#eef3ea] transition-colors">
            <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{category.description}</p>
        </button>
    )
}

function Categories() {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const handleFetchCategories = async () => {
            try {
                const result = await getCategories();
                if (result.success) {
                    setCategories(result.data.items);
                }
            } catch (_err) {
                console.error("Error fetching categories", _err);
            }
        }
        handleFetchCategories();
    }, []);

    return (
        <section className="py-16 lg:py-20 bg-white border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div className="">
                        <span className="text-xs font-medium text-accent uppercase tracking-widest mb-2">Duyệt theo chủ đề</span>
                        <h4 className="font-display text-3xl sm:text-4xl text-foreground">Thể loại</h4>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-xs">Explore our curated collection across nine disciplines.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Categories;