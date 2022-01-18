import { useAtom } from "jotai";
import state from "../state";

const UserPage = () => {
    const [user] = useAtom(state.user);

    const fetchUserData = async () => {
        const request = await fetch(
            process.env.REACT_APP_SERVER_URL + "profile"
        );
        const response = await request.json();
    };

    return <div></div>;
};

export default UserPage;
