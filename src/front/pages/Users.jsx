import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import react, { useState, useEffect } from "react";

export const Users = () => {
    const { store, dispatch } = useGlobalReducer()
    const navigate = useNavigate()
    const { token } = store
    const [users, setUsers] = useState([])

    useEffect(() => {

        const fetchUsers = async (e) => {

            if (!token) {
                alert("No autorizado: redirigido a login")
                navigate("/login")
                return
            }

            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${backendUrl}/api/users`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error al cargar los usuarios", error);
                alert("ERROR DE CARGA")
            }

        }
        fetchUsers();

    }, [])


    return (
        <div className="container d-flex justify-content-center">
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-header">
                    Users
                </div>
                <ul className="list-group list-group-flush">
                    {users.map((user) => {
                        return (
                            <li className="list-group-item" key={user.id} id={user.id}>{user.username}</li>
                        );
                    })}
                </ul>
            </div>

        </div>
    );
};
