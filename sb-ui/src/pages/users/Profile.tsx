import { useNavigate } from "react-router-dom";
import { logout } from "../../services/api";

function Profile() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const result = await logout();
            if (result.success) {
                navigate("/login");
            }
        } catch (_err) {
            console.error("Error logout", _err);
        }
    }
    return (
        <div className="">
           <button onClick={handleLogout}>Dang xuat</button>
        </div>
    );
}

export default Profile;