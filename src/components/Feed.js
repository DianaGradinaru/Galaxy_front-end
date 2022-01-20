import { useEffect } from "react";
import { useAtom } from "jotai";
import state from "../state";
import Star from "./Star";

const Feed = ({ is_private = false }) => {
    const [posts, setPosts] = useAtom(state.posts);
    const [user] = useAtom(state.user);

    useEffect(() => {
        const getPosts = async () => {
            let url =
                process.env.REACT_APP_SERVER_URL +
                (is_private ? "profile/myPosts" : "");
            let requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: user.id }),
            };

            const req = await fetch(
                url,
                is_private ? requestOptions : { method: "GET" }
            );
            const res = await req.json();

            if (res) {
                setPosts(res);
            }
        };

        getPosts();
    }, [is_private]);

    return (
        <div className="mt-3">
            {!posts.length ? "" : posts.map((p) => <Star key={p.id} {...p} />)}
        </div>
    );
};

export default Feed;
