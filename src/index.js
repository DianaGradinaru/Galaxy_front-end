import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import PostForm from "./components/PostForm";
import Feed from "./components/Feed";
import UserPage from "./components/UserPage";

const themeLight = createMuiTheme({
    palette: {
        background: {
            default: "#F4FFFF",
        },
    },
});

const themeDark = createMuiTheme({
    palette: {
        background: {
            default: "#2A2D2E",
        },
        text: {
            primary: "#ffffff",
        },
    },
});

const Galaxy = () => {
    const [light, setLight] = React.useState(true);
    return (
        <>
            <MuiThemeProvider theme={light ? themeLight : themeDark}>
                <CssBaseline />

                <Navbar />
                <Button onClick={() => setLight((prev) => !prev)}>
                    DarkMode
                </Button>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-3">Sidebar</div>
                        <div className="col-md-6">
                            <Routes>
                                <Route
                                    path="/register"
                                    element={<Register />}
                                ></Route>
                                <Route
                                    path="/login"
                                    element={<Login />}
                                ></Route>
                                <Route
                                    path="/logout"
                                    element={<Logout />}
                                ></Route>
                                <Route
                                    path="/"
                                    element={
                                        <>
                                            <PostForm />
                                            <Feed />
                                        </>
                                    }
                                ></Route>
                            </Routes>
                        </div>
                        <div className="col-md-3">Sidebar</div>
                    </div>
                </div>
                <UserPage />
            </MuiThemeProvider>
        </>
    );
};

render(
    <BrowserRouter>
        <Galaxy />
    </BrowserRouter>,
    document.getElementById("root")
);
