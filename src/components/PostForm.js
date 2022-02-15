import * as React from "react";
import { useState } from "react";
import { useAtom } from "jotai";
import state from "../state";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import UploadIcon from "@mui/icons-material/Upload";

import cloudinaryUpload from "./UploadImages";

const PostForm = () => {
    const [text, setText] = useState("");
    const [posts, setPosts] = useAtom(state.posts);
    const [user, setUser] = useAtom(state.user);
    const [open, setOpen] = useAtom(state.showDialog);

    const [imageUrl, setimageUrl] = useState("");

    const handlePost = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append("userid", user.id);

        // formData.append("file", e.target.files[0]);
        console.log(e.target.files.file);
        console.log(formData);
        // sent the image to the cloud
        cloudinaryUpload(formData).then((res) => setimageUrl(res.secure_url));

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
            setOpen(!open);
            console.log(res);
        }
    };

    const updateText = (e) => {
        e.preventDefault();
        setText(e.target.value);
    };

    if (!user || !user.id) return null;

    return (
        <Box
            sx={{ "& .MuiTextField-root": { m: 1, width: "584px" } }}
            noValidate
            autoComplete="off"
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
                    helperText={`${200 - text.length} characters remaining`}
                />
                <label htmlFor="raised-button-file">
                    <input
                        type="file"
                        accept="image/*"
                        id="raised-button-file"
                        name="file"
                        style={{ display: "none" }}
                        form="starForm"
                    />
                    <Button
                        variant="outlined"
                        component="span"
                        startIcon={<UploadIcon />}
                        style={{ margin: 10 }}
                    >
                        Upload image
                    </Button>
                </label>

                <Button
                    type="submit"
                    variant="outlined"
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
