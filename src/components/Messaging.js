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
    const [showChat, setShowChat] = useState(false);
    const room = "123";

    const joinRoom = () => {
        socket.emit("join_room", room);
        setShowChat(true);
    };

    return (
        <div>
            {!showChat ? (
                // <button onClick={joinRoom}>Message online users</button>
                <Box>
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
                <Chat socket={socket} username={user.name} room={room} />
            )}
        </div>
    );
}

export default Messaging;
