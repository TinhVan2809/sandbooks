import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { register } from "../../services/api";

function Register() {
     const [isShowPassowrd, setIsShowPassword] = useState<boolean>(false);

     const [formData, setFormData] = useState({
        nickname: "",
        username: "",
          password: "",
     });

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
     }

         const handleSubmit = async(e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
             const result = await register(formData);
             if(result.success) {
                console.log("Register success", result.data);
             }
        } catch(_err) {
            console.error("Error register", _err);
        }
     }

    const onShowPassoword = () => {
        setIsShowPassword(!isShowPassowrd);
    }

    return ( 
        <div className="flex w-full h-screen justify-center items-center bg-[#f8f6f1]">
            <div className="flex flex-col gap-7 max-w-105 w-full">
                <div className="flex flex-col gap-2 w-full justify-center items-center">
                    <h4 className="text-xl flex items-center gap-2 text-[#1a1814] font-medium"> <img src="/SANDBOOKS.png" className="w-8 rounded-xl"/>SandBooks</h4>
                    <p className="text-2xl font-medium text-[#1a1814]">Wellcome to SandBooks</p>
                    <p className="text-sm text-[#7a7368]">Đăng ký tài khoản mới.</p>
                </div>
                <form className="bg-white py-8 px-7 rounded-2xl shadow-sm flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
                    <div className="flex flex-col w-full gap-y-1">
                        <label className="text-sm text-[#1a1814] font-medium">Nickname</label>
                        <input name="nickname" type="text" placeholder="Nhập nickname của bạn" className="border border-black/20 rounded-md py-2.5 px-3.5 text-sm w-full outline-0" onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col w-full gap-y-1">
                        <label className="text-sm text-[#1a1814] font-medium">Username</label>
                        <input name="username" type="text" placeholder="Username" className="border border-black/20 rounded-md py-2.5 px-3.5 text-sm w-full outline-0" onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col w-full gap-y-1">
                        <label className="text-sm text-[#1a1814] font-medium">Password</label>
                        <div className="flex border border-black/20 rounded-md py-2.5 px-3.5 text-sm w-full items-center">
                            <input name="password" type={isShowPassowrd ? "text" : "password"} placeholder={isShowPassowrd ? "Nhập mật khẩu" : "********"} className="outline-0 w-full" onChange={handleChange}/>
                            <span className="opacity-80 cursor-pointer" onClick={onShowPassoword}>
                                {isShowPassowrd ? <RiEyeLine size={18} /> : <RiEyeOffLine size={18} />}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button className="bg-[#3a5740] text-white font-medium px-5 py-2.5 text-sm rounded-lg cursor-pointer hover:brightness-90 active:scale-[0.99]">Đăng ký</button>
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
                    <p className="text-[#7a7368] text-sm">Đã có tài khoản? <Link to={"/login"} className="#3a5740 font-medium">Đăng nhập</Link></p>
                    <span className="text-xs text-[#7a7368]">© 2026 SandBooks · Privacy · Terms</span>
                </div>
            </div>
        </div>
     );
}

export default Register;