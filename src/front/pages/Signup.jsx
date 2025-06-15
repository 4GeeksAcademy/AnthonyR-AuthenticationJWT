import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import react, { useState } from "react";

export const Signup = () => {
    const { store, dispatch } = useGlobalReducer()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !username) {
            alert("Todos los campos son requeridos")
            return
        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendUrl}/api/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password, username }),
            });
            const data = await response.json();
            console.log(response);

            if (response.status == 409) {
                alert("Usuario ya existe, intenta logearte")
                navigate("/login")
                return
            }

            alert("Usuario registrado")
            navigate("/login")

        } catch (error) {
            console.error("Error de signup", error);
            alert("ERROR DE SIGNUP")
        }

    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="card text-center w-50">
                <div className="card-header">
                    Signup
                </div>
                <div className="card-body text-start">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" aria-describedby="emailHelp" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};