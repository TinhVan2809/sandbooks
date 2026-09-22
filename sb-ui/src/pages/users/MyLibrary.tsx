import { RiBookmarkLine } from "@remixicon/react";
import BooksSave from "../../components/users/BooksSave";

function MyLybrary() {
    return (
        <section>
            <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-y-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center text-primary">
                        <RiBookmarkLine />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display text-3xl text-foreground">My Library</span>
                        <span className="text-sm text-muted-foreground">Your personal reading collection</span>
                    </div>
                </div>
                <div className="">
                  <div className="">
                      <h3 className="text-lg font-semibold text-foreground">Sách đã lưu</h3>
                    <span className="text-sm text-muted-foreground">Danh sách đọc cá nhân của bạn</span>
                  </div>
                  <div className="mt-4">
                    <BooksSave />
                  </div>
                </div>
            </div>
        </section>
    );
}

export default MyLybrary;