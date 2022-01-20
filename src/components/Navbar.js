import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import state from "../state";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { positions } from "@mui/system";

const Navbar = () => {
    const [user] = useAtom(state.user);
    const isUser = user && user.id;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark text-light bg-dark">
            <div className="container">
                <AutoAwesomeIcon fontSize="large" sx={{ margin: 2 }} />
                <Link className="navbar-brand" to="/">
                    Galaxy
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    {isUser && (
                        <>
                            <span className="navbar-text ms-auto">
                                {user.name}
                            </span>
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li>
                                    <Link className="nav-link" to="/logout">
                                        Log out
                                    </Link>
                                </li>
                            </ul>
                        </>
                    )}
                    {!isUser && (
                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                            <li>
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
