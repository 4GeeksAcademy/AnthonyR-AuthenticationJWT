import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import {useState} from "react";

export const Login = () => {
    const { store, dispatch } = useGlobalReducer()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("El email y la contraseña son requeridos")
            return
        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendUrl}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            });
            const data = response.json();

            dispatch({
                type: "loginSuccess",
                payload : {
                    token: data.token,
                    user: data.user,
                }
            })
            navigate("/users")
            
        } catch (error) {
            console.error("Error de login", error);
            alert("ERROR DE LOGIN")
        }

    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="card text-center w-50">
                <div className="card-header">
                    Login
                </div>
                <div className="card-body text-start">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
