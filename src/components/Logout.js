import { useAtom } from "jotai";
import state from "../state";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
    const [, setUser] = useAtom(state.user);
    const navigate = useNavigate();

    useEffect(() => {
        setUser({});
        localStorage.removeItem("loggedUser");
        navigate("/");
        window.location.reload();
    }, [navigate, setUser]);

    return null;
};

export default Logout;
