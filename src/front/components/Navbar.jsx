import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch({ type: "logout" });
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light mb-5">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-primary">Signup</button>
					</Link>
					<Link to="/login">
						<button className="btn btn-primary ms-2">Login</button>
					</Link>
					<button className="btn btn-primary ms-2" onClick={handleLogout}>Logout</button>
				</div>
			</div>
		</nav>
	);
};