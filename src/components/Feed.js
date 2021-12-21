import { useEffect } from "react";
import { useAtom } from "jotai";
import state from "../state";
import Star from "./Star";

const Feed = () => {
    const [posts, setPosts] = useAtom(state.posts);
    const [user, setUser] = useAtom(state.user);

    useEffect(() => {
        const getPosts = async () => {
            const req = await fetch(process.env.REACT_APP_SERVER_URL);
            const res = await req.json();

            if (res) {
                setPosts(res);
            }
        };

        getPosts();
    }, []);

    return (
        <div className="mt-3">
            <pre>
                <code>{JSON.stringify(user, null, 4)}</code>
            </pre>
            {!posts.length ? "" : posts.map((p) => <Star key={p.id} {...p} />)}
        </div>
    );
};

export default Feed;
