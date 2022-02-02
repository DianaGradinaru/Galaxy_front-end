import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useAtom } from "jotai";
import state from "../state";
import Link from "@mui/material/Link";

const ResponsiveAppBar = () => {
    const [user] = useAtom(state.user);
    const profile_pic = state.user.init.profile_pic;
    const isUser = user && user.id;
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            style={{
                background: "#000000",
                position: "fixed",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AutoAwesomeIcon fontSize="large" sx={{ margin: 2 }} />
                    <Link sx={{ color: "white" }} href="/">
                        Galaxy
                    </Link>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    ></Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    ></Box>

                    {isUser && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt={state.user.init.name}
                                        src={
                                            "data:image/png;base64," +
                                            profile_pic
                                        }
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link
                                        href="/logout"
                                        sx={{
                                            typography: "body1",
                                            color: "black",
                                        }}
                                    >
                                        Logout
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                    {!isUser && (
                        <Box>
                            <Link
                                href="/login"
                                sx={{
                                    typography: "body1",
                                    color: "white",
                                    margin: "15px",
                                }}
                            >
                                Log in
                            </Link>

                            <Link
                                href="/register"
                                sx={{
                                    typography: "body1",
                                    color: "white",
                                }}
                            >
                                Register
                            </Link>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
