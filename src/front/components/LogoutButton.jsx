import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch({ type: "logout" });
        navigate("/login");
    };

    return (
        <>
            <button className="btn btn-primary ms-2" onClick={handleLogout}>Logout</button>
        </>
    );
};