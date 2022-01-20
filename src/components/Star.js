import moment from "moment";

import * as React from "react";
import Box from "@material-ui/core/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Star as StarFilledIcon } from "@mui/icons-material/Star";

import Modal from "@mui/material/Modal";

import { useAtom } from "jotai";
import state from "../state";

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

const Star = ({ id, user_id, text, image, createdat, name }) => {
    // console.log(id, user_id);
    const [user, setUser] = useAtom(state.user);
    const [posts, setPosts] = useAtom(state.posts);
    const isUser = user && user.id && user.name === name;

    const created = moment(createdat).fromNow();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
        const request = await fetch(
            process.env.REACT_APP_SERVER_URL + "delete",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                }),
            }
        );

        const response = await request.json();

        setPosts(posts.filter((p) => p.id !== id));
        setUser({ ...user, count: parseInt(user.count) - 1 });
    };

    const handleFavorites = async () => {
        const request = await fetch(
            process.env.REACT_APP_SERVER_URL + "profile/favorites",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    favorited_by: user_id,
                    star_id: id,
                }),
            }
        );

        const response = await request.json();

        console.log(response);
    };

    return (
        <Box m={2} pt={3}>
            <Card sx={{ maxWidth: 545 }}>
                <CardActionArea>
                    {image && (
                        <CardMedia
                            component="img"
                            height="445"
                            image={"data:image/png;base64," + image}
                            onClick={handleOpen}
                        />
                    )}
                    <CardContent>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            style={{ wordWrap: "break-word" }}
                        >
                            {text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Typography gutterBottom variant="body1" component="div">
                        {name} - <small title={createdat}>{created}</small>
                    </Typography>
                    {isUser && (
                        <DeleteIcon
                            sx={{ ml: "auto" }}
                            color="action"
                            onClick={handleDelete}
                        />
                    )}
                    {!isUser && (
                        <StarOutlineIcon
                            sx={{ ml: "auto" }}
                            onClick={handleFavorites}
                        />
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
                    <CardMedia
                        component="img"
                        image={"data:image/png;base64," + image}
                    />
                </Card>
            </Modal>
        </Box>
    );
};

export default Star;
