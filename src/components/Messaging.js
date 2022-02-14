import React, { useState } from "react";
import io from "socket.io-client";
import { useAtom } from "jotai";
import state from "../state";
import Chat from "./Chat";
import "./Messaging.css";

import Box from "@mui/material/Box";
import DraftsIcon from "@mui/icons-material/Drafts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const socket = io.connect("http://localhost:3001");

function Messaging() {
    const [user] = useAtom(state.user);
    const isUser = user && user.id;
    const [showChat, setShowChat] = useState(false);
    var element = document.querySelector(".forMsg");
    var room = "123";
    // if (user.id !== undefined) {
    //     var room =
    //         "" +
    //         Math.min(element.getAttribute("data-id"), user.id) +
    //         Math.max(element.getAttribute("data-id"), user.id);
    // }
    // console.log(room);

    const joinRoom = () => {
        socket.emit("join_room", room);
        setShowChat(true);
    };

    if (!isUser) return <></>;

    return (
        <div>
            {!showChat ? (
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 250,
                        bgcolor: "background.paper",
                        position: "fixed",
                    }}
                >
                    <List>
                        <ListItem>
                            <ListItemButton onClick={joinRoom}>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Messages" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            ) : (
                <Chat
                    socket={socket}
                    username={user.name}
                    room={room}
                    user_id={user.id}
                />
            )}
        </div>
    );
}

export default Messaging;
