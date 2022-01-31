import * as React from "react";
import { useAtom } from "jotai";
import state from "../state";
import PostForm from "./PostForm";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const SendStar = ({ open }) => {
    const [user] = useAtom(state.user);
    const [close, setClose] = useAtom(state.showDialog);

    if (!user || !user.id) return null;

    return (
        <Dialog onClose={() => setClose(!close)} open={open}>
            <DialogTitle> </DialogTitle>
            <PostForm />
        </Dialog>
    );
};

export default SendStar;
