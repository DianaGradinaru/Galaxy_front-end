import { useAtom } from "jotai";
import state from "../state";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [, setUser] = useAtom(state.user);
    const navigate = useNavigate();

    useEffect(() => {
        setUser({});
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("email", e.target.email.value);
        formData.append("password", e.target.password.value);

        const req = await fetch(process.env.REACT_APP_SERVER_LOGIN, {
            method: "POST",
            body: formData,
        });

        if (req.ok) {
            const res = await req.json();
            setUser(res.user);
            localStorage.setItem("loggedUser", JSON.stringify(res.user));
            navigate("/");
        }
    };

    return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 id="loginmodaltitle" className="modal-title">
                        Login
                    </h5>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Your password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="password"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-secondary">
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
