import { useState } from "react";
import { useAtom } from "jotai";
import state from "../state";

const PostForm = () => {
    const [text, setText] = useState("");
    const [posts, setPosts] = useAtom(state.posts);
    const [user] = useAtom(state.user);

    const handlePost = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append("userid", user.id);

        const req = await fetch(process.env.REACT_APP_SERVER_URL, {
            method: "POST",
            body: formData,
        });

        if (req.ok) {
            const res = await req.json();
            setPosts([res, ...posts]);
            e.target.reset();
            setText("");
        }
    };

    const updateText = (e) => {
        e.preventDefault();
        setText(e.target.value);
    };

    if (!user || !user.id) return null;

    return (
        <div className="mt-3">
            <form onSubmit={handlePost} encType="multipart/form-data">
                <label htmlFor="text" className="form-label">
                    Message
                </label>
                <textarea
                    name="text"
                    id="text"
                    className="form-control"
                    maxLength={200}
                    defaultValue={text}
                    onChange={updateText}
                ></textarea>
                <p className="form-text">
                    {200 - text.length} characters remaining
                </p>

                <label className="form-label mt-2" htmlFor="file">
                    File
                </label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    className="form-control"
                />
                <button className="btn btn-primary mt-3" type="submit">
                    Post
                </button>
            </form>
        </div>
    );
};

export default PostForm;
