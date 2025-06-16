import { Link } from "react-router-dom";

export const LoginButton = () => {

    return (
        <>
            <Link to="/login">
                <button className="btn btn-primary ms-2">Login</button>
            </Link>
        </>
    );
};