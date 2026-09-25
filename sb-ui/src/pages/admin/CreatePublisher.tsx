import { useState, type MouseEvent } from "react";
import { createPublisher } from "../../services/api";

function CreatePublisher() {

    const [form, setForm] = useState("");
    const [message, setMessage] = useState(false);

    const handleCreatePublisher = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const result = await createPublisher(form);
            if (result.success) {

                setMessage(true);

                setTimeout(() => {
                    setMessage(false);
                }, 2000);
                setForm("");
            }
        } catch (_err) {
            console.error("Error creating publisher", _err);
        }
    }

    return (
        <div className="">
            <div className="flex flex-col gap-3">
                <input type="text" value={form} placeholder="Thêm NXB" onChange={(e) => setForm(e.target.value)} className="bg-white placeholder:text-black/50 py-2.5 px-2 outline-0 text-black rounded" required />
                <button type="button" onClick={handleCreatePublisher} className="bg-white text-black rounded-lg py-2 transition hover:bg-gray-100">Submit</button>
                {message && <p className="text-sm text-[#dce7d9] font-medium mt-1">Đã tạo NXB thành công!</p>}
            </div>
        </div>
    );
}

export default CreatePublisher;