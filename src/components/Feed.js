import { useEffect } from "react";
import { useAtom } from "jotai";
import state from "../state";
import Star from "./Star";

const Feed = () => {
    const [posts, setPosts] = useAtom(state.posts);

    useEffect(() => {
        const getPosts = async () => {
            const req = await fetch(process.env.REACT_APP_SERVER_URL);
            const res = await req.json();

            setPosts(res);
        };

        getPosts();
    }, []);

    return (
        <div className="mt-3">
            {!posts.length ? "" : posts.map((p) => <Star key={p.id} {...p} />)}
        </div>
    );
};

export default Feed;
