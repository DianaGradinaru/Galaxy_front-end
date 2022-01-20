import { useEffect } from "react";
import { useAtom } from "jotai";
import state from "../state";

import Star from "./Star";

const GeneralFeed = ({ url = "/", post = false }) => {
    const [posts, setPosts] = useAtom(state.posts);
    const [user] = useAtom(state.user);

    useEffect(() => {
        const loader = async () => {
            let optionsObject = {
                method: "GET",
            };

            if (post) {
                optionsObject = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: user.id }),
                };
            }

            const request = await fetch(
                process.env.REACT_APP_SERVER_URL + url,
                optionsObject
            );
            if (request.ok) {
                const response = await request.json();
                setPosts(response);
            }
        };

        loader();
    }, [url]);

    return (
        <div className="mt-3">
            {!posts.length ? "" : posts.map((p) => <Star key={p.id} {...p} />)}
        </div>
    );
};

export default GeneralFeed;
