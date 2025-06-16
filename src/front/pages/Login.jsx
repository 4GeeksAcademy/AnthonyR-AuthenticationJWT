import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import react, { useState } from "react";
import { Modal } from "/workspaces/AnthonyR-AuthenticationJWT/src/front/components/Modal";

export const Login = () => {
    const { store, dispatch } = useGlobalReducer()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalmsg, setModalmsg] = useState("")
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setShowModal(true)
            setModalTitle("Campos incompletos")
            setModalmsg("Por favor completa todos los campos antes de continuar.")
            return
        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendUrl}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            
            if (response.status == 404 || response.status == 400) {
                setShowModal(true)
                setModalTitle("Datos incorrectos")
                setModalmsg("Usuario o contraseña incorrecta.")
                return
            }

            dispatch({
                type: "login_success",
                payload: {
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
        <>
            {showModal && <Modal onClose={() => setShowModal(false)} title={modalTitle} msg={modalmsg} />}
            <div className="container d-flex justify-content-center">
                <div className="card text-center w-50">
                    <div className="card-header">
                        Login
                    </div>
                    <div className="card-body text-start">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
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
        </>
    );
};
