import moment from "moment";

import * as React from "react";
import Box from "@material-ui/core/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarRateIcon from "@mui/icons-material/StarRate";
import ReplyIcon from "@mui/icons-material/Reply";

import Modal from "@mui/material/Modal";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import state from "../state";
import { addReplies } from "./Replies";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "700px",
    maxHeight: "auto",
    height: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
const cdn = process.env.REACT_APP_AWS_CDN_URL;

const Star = ({ id, user_id, text, image, createdat, name }) => {
    const [user, setUser] = useAtom(state.user);
    const [posts, setPosts] = useAtom(state.posts);
    const notLoggedIn = state.user.init.id === undefined;
    const isUser = user && user.id && user.name === name;
    const [, setShowProfile] = useAtom(state.showProfile);

    const [isFavorite, setIsFavorite] = useState(false);

    const created = moment(createdat).fromNow();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const loader = async () => {
            const request = await fetch(
                process.env.REACT_APP_SERVER_URL + "/profile/favorites",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: user.id }),
                }
            );
            if (request.ok) {
                const response = await request.json();
                setIsFavorite(!!response.filter((r) => r.id === id).length);
            }
        };
    }, []);

    const fetchUserData = async (id) => {
        const request = await fetch(
            process.env.REACT_APP_SERVER_URL + "/profile",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            }
        );
        const response = await request.json();
        setShowProfile(response.user);
    };

    const handleDelete = async () => {
        const request = await fetch(
            process.env.REACT_APP_SERVER_URL + "/delete",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    image,
                }),
            }
        );

        setPosts(posts.filter((p) => p.id !== id));
        setUser({ ...user, count: parseInt(user.count) - 1 });
    };

    const addFavorites = async () => {
        const request = await fetch(
            process.env.REACT_APP_SERVER_URL + "/profile/favorites/add",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    favorited_by: user.id,
                    star_id: id,
                }),
            }
        );
        if (request.ok) {
            setIsFavorite(true);
        }
    };

    const removeFavorites = async () => {
        const request = await fetch(
            process.env.REACT_APP_SERVER_URL + "/profile/favorites/remove",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    favorited_by: user.id,
                    star_id: id,
                }),
            }
        );
        if (request.ok) {
            setIsFavorite(false);
        }
    };

    return (
        <Box m={2} pt={3}>
            <Card variant="outlined" width="545px">
                <CardActionArea>
                    {image && (
                        <CardMedia
                            component="img"
                            height="445"
                            image={`${cdn}${image}`}
                            onClick={handleOpen}
                        />
                    )}
                    <CardContent>
                        <Typography
                            variant="body1"
                            color="text.primary"
                            style={{ wordWrap: "break-word" }}
                        >
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Typography gutterBottom variant="body2">
                        <span
                            className="forMsg"
                            data-id={user_id}
                            onClick={(e) => fetchUserData(e.target.dataset.id)}
                        >
                            {name}
                        </span>
                        - <small title={createdat}>{created}</small>
                    </Typography>

                    {isUser && (
                        <Tooltip title="Delete star">
                            <DeleteIcon
                                sx={{ ml: "auto" }}
                                color="action"
                                onClick={handleDelete}
                            />
                        </Tooltip>
                    )}
                    {notLoggedIn || isUser ? (
                        <></>
                    ) : isFavorite ? (
                        <>
                            <Tooltip title="Reply to star">
                                <ReplyIcon
                                    data-id={id}
                                    sx={{ ml: "auto" }}
                                    color="action"
                                    onClick={(e) => addReplies(e, user)}
                                />
                            </Tooltip>
                            <Tooltip title="Added to favorites">
                                <StarRateIcon
                                    style={{ fill: "goldenrod" }}
                                    sx={{ ml: "auto" }}
                                    onClick={removeFavorites}
                                />
                            </Tooltip>
                        </>
                    ) : (
                        <>
                            <Tooltip title="Reply to star">
                                <ReplyIcon
                                    data-id={id}
                                    sx={{ ml: "auto" }}
                                    color="action"
                                    // onClick={}
                                />
                            </Tooltip>
                            <Tooltip title="Add star to favorites">
                                <StarOutlineIcon
                                    sx={{ ml: "auto" }}
                                    onClick={addFavorites}
                                />
                            </Tooltip>
                        </>
                    )}
                </CardActions>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={style}>
                    <CardMedia component="img" image={`${cdn}${image}`} />
                </Card>
            </Modal>
            {/* <UserPage open={showProfile} /> */}
        </Box>
    );
};

export default Star;
