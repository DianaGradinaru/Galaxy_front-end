import * as React from "react";
import { useState } from "react";
import { useAtom } from "jotai";
import state from "../state";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const PostForm = () => {
    const [text, setText] = useState("");
    const [posts, setPosts] = useAtom(state.posts);
    const [user, setUser] = useAtom(state.user);

    const handlePost = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append("userid", user.id);
        console.log(e.target);
        console.log(formData);

        const req = await fetch(process.env.REACT_APP_SERVER_URL, {
            method: "POST",
            body: formData,
        });

        if (req.ok) {
            const res = await req.json();
            setPosts([{ ...res, name: user.name }, ...posts]);
            setUser({ ...user, count: parseInt(user.count) + 1 });
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
        <Box
            // component="form"
            sx={{ "& .MuiTextField-root": { m: 1, width: "62ch" } }}
            noValidate
            autoComplete="off"
            // onSubmit={handlePost}
        >
            <form
                onSubmit={handlePost}
                encType="multipart/form-data"
                id="starForm"
            >
                <TextField
                    label="What's on your mind?"
                    multiline
                    rows={4}
                    name="text"
                    id="text"
                    className="form-control"
                    defaultValue={text}
                    onChange={updateText}
                    form="starForm"
                />
                <p className="form-text">
                    {200 - text.length} characters remaining
                </p>
                <input
                    accept="image/*"
                    // className={classes.input}
                    style={{ display: "none" }}
                    id="raised-button-file"
                    // multiple
                    className="form-control"
                    type="file"
                    form="starForm"
                />
                <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span">
                        Upload image
                    </Button>
                </label>
                <Button
                    type="submit"
                    variant="primary"
                    component="button"
                    form="starForm"
                >
                    Send star
                </Button>
            </form>
        </Box>
    );
};

export default PostForm;
