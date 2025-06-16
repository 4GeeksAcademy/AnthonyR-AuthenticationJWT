import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { LoginButton } from "/workspaces/AnthonyR-AuthenticationJWT/src/front/components/LoginButton"
import { LogoutButton } from "/workspaces/AnthonyR-AuthenticationJWT/src/front/components/LogoutButton"
import { SignupButton } from "/workspaces/AnthonyR-AuthenticationJWT/src/front/components/SignupButton"

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-light bg-light mb-5">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					{!store.isAuthenticated && <SignupButton />}
					{store.isAuthenticated ? <LogoutButton /> : <LoginButton />}
				</div>
			</div>
		</nav>
	);
};