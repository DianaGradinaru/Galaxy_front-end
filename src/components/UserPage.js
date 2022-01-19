import { useEffect } from "react";
import { useAtom } from "jotai";
import state from "../state";

const UserPage = () => {
    const [user, setUser] = useAtom(state.user);

    console.log(user.id);
    useEffect(() => {
        const fetchUserData = async () => {
            const request = await fetch(
                process.env.REACT_APP_SERVER_URL + "profile",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: user.id }),
                }
            );
            const response = await request.json();

            setUser(response);
        };

        fetchUserData();
    }, []);

    return <pre>{JSON.stringify(user, null, 2)} </pre>;
};

export default UserPage;
