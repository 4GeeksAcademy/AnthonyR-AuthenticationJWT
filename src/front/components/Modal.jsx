import { Link } from "react-router-dom";

export const Modal = (props) => {
    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.title}</h5>
                        <button type="button" className="btn-close" onClick={props.onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>{props.msg}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={props.onClose}>
                            Entendido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};