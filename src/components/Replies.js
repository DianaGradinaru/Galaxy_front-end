import * as React from "react";
import { useState, useAtom } from "jotai";
import state from "../state";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const addReplies = async (e, user) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append("userid", user.id);

    console.log(formData);

    const request = await fetch(process.env.REACT_APP_SERVER_URL + "/replies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            star_id: 1,
            reply_user_id: user.id,
            reply_user_name: user.name,
            reply_text: "b",
        }),
    });
    if (request.ok) {
        const result = await request.json();
        e.target.reset();
        return result;
    }
};

const PostReply = () => {
    const [user] = useAtom(state.user);
    const [text, setText] = useState("");

    const addPostReplies = async (e) => {
        const rez = await addReplies(e, user);
        if (rez) {
            setText("");
        }
    };
    const updateText = (e) => {
        e.preventDefault();
        setText(e.target.value);
    };
    return (
        <Box
            sx={{ "& .MuiTextField-root": { m: 1, width: "584px" } }}
            noValidate
            autoComplete="off"
        >
            <form
                onSubmit={addPostReplies}
                encType="multipart/form-data"
                id="replyForm"
            >
                <TextField
                    label="Your reply"
                    multiline
                    rows={4}
                    name="text"
                    id="text"
                    className="form-control"
                    defaultValue={text}
                    onChange={updateText}
                    form="replyForm"
                    helperText={`${200 - text.length} characters remaining`}
                />
                <Button
                    type="submit"
                    variant="outlined"
                    component="button"
                    form="replyForm"
                >
                    Send reply
                </Button>
            </form>
        </Box>
    );
};
export default PostReply;
export { addReplies };
