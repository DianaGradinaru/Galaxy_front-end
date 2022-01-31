import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DraftsIcon from "@mui/icons-material/Drafts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import GroupIcon from "@mui/icons-material/Group";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useAtom } from "jotai";
import state from "../state";

const LeftMenu = () => {
    const [open, setOpen] = React.useState(false);
    const [user] = useAtom(state.user);
    const isUser = user && user.id;

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {" "}
            {isUser && (
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 330,
                        bgcolor: "background.paper",
                        position: "fixed",
                    }}
                >
                    <nav aria-label="main mailbox folders">
                        <List>
                            <ListItem>
                                <ListItemButton component="a" href="/">
                                    <ListItemIcon>
                                        <AutoAwesomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="All Galaxies" />
                                </ListItemButton>
                            </ListItem>

                            <ListItem>
                                <ListItemButton
                                    component="a"
                                    href="/profile/myPosts"
                                >
                                    <ListItemIcon>
                                        <AutoAwesomeTwoToneIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="My Galaxy" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton
                                    component="a"
                                    href="/profile/favorites"
                                >
                                    <ListItemIcon>
                                        <GroupIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Favorite Galaxies" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton onClick={handleClickOpen}>
                                    <ListItemIcon>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="My Profile" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DraftsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="My Messages" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                    <Divider />
                    <nav aria-label="secondary mailbox folders"></nav>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-description">
                            <Typography variant="h6" align="center">
                                {"About"}
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-title">
                                <Typography variant="h6" align="center">
                                    {user.name}
                                </Typography>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Avatar
                                        src={
                                            "data:image/png;base64," +
                                            user.profile_pic
                                        }
                                        sx={{ width: 100, height: 100 }}
                                    />
                                </Box>
                                My galaxy has {user.count} stars.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Edit</Button>
                            <Button onClick={handleClose} autoFocus>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            )}
        </>
    );
};

export default LeftMenu;
