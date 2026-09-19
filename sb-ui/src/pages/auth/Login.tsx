import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "../../services/api";
function Login() {

    const [isShowPassowrd, setIsShowPassword] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const result = await login(formData);
            if (result.success) {
               if(result.data.user.role === "user") {
                 navigate("/");
               } else {
                navigate("/dashboard")
               }
            }
        } catch (_err) {
            console.error("error login", _err);
        }
    }



    const onShowPassoword = () => {
        setIsShowPassword(!isShowPassowrd);
    }

    return (
        <div className="flex w-full h-screen justify-center items-center bg-[#f8f6f1]">
            <div className="flex flex-col gap-7 max-w-105 w-full">
                <div className="flex flex-col gap-2 w-full justify-center items-center">
                    <h4 className="text-xl flex items-center gap-2 text-[#1a1814] font-medium"> <img src="/SANDBOOKS.png" className="w-8 rounded-xl" />SandBooks</h4>
                    <p className="text-2xl font-medium text-[#1a1814]">Wellcome back</p>
                    <p className="text-sm text-[#7a7368]">Đăng nhập để tiếp tục.</p>
                </div>
                <form className="bg-white py-8 px-7 rounded-2xl shadow-sm flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col w-full gap-y-1">
                        <label className="text-sm text-[#1a1814] font-medium">Username</label>
                        <input type="text" placeholder="Username" className="border border-black/20 rounded-md py-2.5 px-3.5 text-sm w-full outline-0" name="username" onChange={handleChange} />
                    </div>
                    <div className="flex flex-col w-full gap-y-1">
                        <label className="text-sm text-[#1a1814] font-medium">Password</label>
                        <div className="flex border border-black/20 rounded-md py-2.5 px-3.5 text-sm w-full items-center">
                            <input type={isShowPassowrd ? "text" : "password"} placeholder={isShowPassowrd ? "Nhập mật khẩu" : "********"} className="outline-0 w-full" name="password" onChange={handleChange} />
                            <span className="opacity-80 cursor-pointer" onClick={onShowPassoword}>
                                {isShowPassowrd ? <RiEyeLine size={18} /> : <RiEyeOffLine size={18} />}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p className="flex gap-x-1 items-center">
                            <input type="checkbox" className="cursor-pointer" />
                            <span className="text-sm text-[#7a7368]">Ghi nhớ tôi</span>
                        </p>
                        <p>
                            <span className="text-sm cursor-pointer font-medium text-[#3a5740]">Quên mật khẩu?</span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className="bg-[#3a5740] text-white font-medium px-5 py-2.5 text-sm rounded-lg cursor-pointer hover:brightness-90 active:scale-[0.99]" type="submit">Đăng nhập</button>
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-[#e4e0d6]" />
                            <span className="text-xs font-medium px-1 tracking-wider uppercase text-[#7a7368]">or</span>
                            <div className="flex-1 h-px bg-[#e4e0d6]" />
                        </div>
                        <button className="border border-[#e4e0d6] rounded-lg px-5 py-2.5 flex items-center justify-center cursor-pointer text-sm">
                            <img src="/2a5758d6-4edb-4047-87bb-e6b94dbbbab0-cover.png" className="w-10" />
                            Tiếp tục với Google
                        </button>
                    </div>
                </form>

                <div className="flex justify-center flex-col w-full items-center gap-3">
                    <p className="text-[#7a7368] text-sm">Chưa có tài khoản? <Link to={"/register"} className="#3a5740 font-medium">Đăng ký</Link></p>
                    <span className="text-xs text-[#7a7368]">© 2026 SandBooks · Privacy · Terms</span>
                </div>
            </div>
        </div>
    );
}

export default Login;