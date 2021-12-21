import { useAtom } from "jotai";
import state from "../state";
import { useRef } from "react";
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [, setUser] = useAtom(state.user);
    const navigate = useNavigate();

    const modalRef = useRef(null);
    const modal = modalRef.current
        ? new Modal(modalRef.current, { backdrop: true })
        : null;

    const handleRegister = async (e) => {
        e.preventDefault();

        if (e.target.terms.checked) {
            const formData = new FormData(e.target);

            const req = await fetch(process.env.REACT_APP_SERVER_REGISTER, {
                method: "POST",
                body: formData,
            });

            if (req.ok) {
                const res = await req.json();
                setUser(res.user);
                modal.hide();
                document
                    .querySelector(".modal-backdrop.fade.show")
                    .classList.remove("show");
                navigate("/");
            }
        }
    };

    return (
        <div
            className="modal fade"
            id="registermodal"
            tabIndex="-1"
            aria-labelledby="registermodaltitle"
            aria-hidden="true"
            ref={modalRef}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 id="registermodaltitle" className="modal-title">
                            Register
                        </h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label
                                    htmlFor="username"
                                    className="form-label"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="name"
                                    aria-describedby="usernameHelp"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Your email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    aria-describedby="emailHelp"
                                />
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone
                                    else.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="terms"
                                    name="terms"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="terms"
                                >
                                    I read and accept the Terms and Conditions
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
