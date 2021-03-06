import { useAtom } from "jotai";
import state from "../state";
import { useNavigate } from "react-router-dom";

import Terms from "./Terms";

var check = () => {
    // console.log(document.getElementById("confirm_password").value);
    if (
        document.getElementById("password").value ===
        document.getElementById("confirm_password").value
    ) {
        document.getElementById("message").style.color = "green";
        document.getElementById("message").innerHTML = "Passwords matching";
    } else {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerHTML = "Passwords not matching";
    }
};

const Register = () => {
    const [, setUser] = useAtom(state.user);
    const navigate = useNavigate();

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
                navigate("/");
            }
        }
    };

    return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Register</h5>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="name"
                                aria-describedby="usernameHelp"
                                required
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
                                required
                            />
                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Create Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                required
                                name="password"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirm_password"
                                required
                                name="confirm_password"
                                onKeyUp={check}
                            />
                            <span id="message"></span>
                        </div>
                        <label className="form-label mt-2" htmlFor="file">
                            Profile picture
                        </label>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            className="form-control"
                        />
                        <div className="mb-3 mt-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="terms"
                                name="terms"
                                required
                            />
                            <label className="form-check-label" htmlFor="terms">
                                <Terms />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-secondary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
