import React, { useState } from "react";
import { createAuthor } from "../../services/api";

function CreataAuthor() {
    const [form, setForm] = useState("");
    const [message, setMessage] = useState(false);

    const handleCreateAuhtor = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!form.trim()) return;

        try {
            const result = await createAuthor(form);
            if (result.success) {
                setMessage(true);
                setTimeout(() => {
                    setMessage(false);
                }, 2000);
                setForm("");
            }
        } catch (_err) {
            console.error("Error creating author", _err);
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <input type="text" value={form} placeholder="Thêm tác giả" onChange={(e) => setForm(e.target.value)} className="bg-white placeholder:text-black/50 py-2.5 px-2 outline-0 text-black rounded" required />
            <button type="button" onClick={handleCreateAuhtor} className="bg-white text-black rounded-lg py-2 transition hover:bg-gray-100">Submit</button>
            {message && <p className="text-sm text-[#dce7d9] font-medium mt-1">Đã tạo tác giả thành công!</p>}
        </div>
    );
}

export default CreataAuthor;