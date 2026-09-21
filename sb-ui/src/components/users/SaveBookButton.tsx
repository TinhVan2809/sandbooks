import { RiBookmarkFill, RiBookmarkLine } from "@remixicon/react";
import { useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { saveBook } from "../../services/api";

type SaveBookButtonProps = {
  bookId: number;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

function SaveBookButton({ bookId, onClick, className = "" }: SaveBookButtonProps) {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);

    if (event.defaultPrevented || isSaving || isSaved) {
      return;
    }

    setIsSaving(true);

    try {
      await saveBook(bookId);
      setIsSaved(true);
    } catch (error) {
      if (error instanceof Error && /Authentication|Unauthorized|401/i.test(error.message)) {
        navigate("/login");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      type="button"
      aria-label={isSaved ? "Đã lưu sách" : "Lưu sách"}
      title={isSaved ? "Đã lưu" : "Lưu sách"}
      disabled={isSaving}
      onClick={handleSave}
      className={`${className} ${isSaved ? "text-[#3b661d]" : ""} disabled:cursor-wait`}
    >
      {isSaved ? <RiBookmarkFill size={15} /> : <RiBookmarkLine size={15} />}
    </button>
  );
}

export default SaveBookButton;