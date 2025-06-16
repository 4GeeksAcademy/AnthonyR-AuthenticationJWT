import { Link } from "react-router-dom";

export const SignupButton = () => {

    return (
        <>
            <Link to="/signup">
                <button className="btn btn-primary">Signup</button>
            </Link>
        </>
    );
};