import { useState } from "react";
import { useAtom } from "jotai";
import state from "../state";

const UserPage = () => {
    const [user] = useAtom(state.user);

    console.log(user);

    return (
        <div>
            <ul>
                <li>{user.name}</li>
                <li>{user.id}</li>
                <li>{user.email}</li>
                <li>{user.profile_pic}</li>
            </ul>
        </div>
    );
};

export default UserPage;
