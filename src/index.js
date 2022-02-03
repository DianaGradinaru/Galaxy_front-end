import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import GeneralFeed from "./components/GeneralFeed";
import LeftMenu from "./components/LeftMenu";
import Messaging from "./components/Messaging";

import ResponsiveAppBar from "./components/_Navbar";

const Galaxy = () => {
    return (
        <>
            <ResponsiveAppBar />
            <div className="container mt-5 pt-1">
                <div className="row mt-5">
                    <div className="col-md-3">
                        <LeftMenu />
                    </div>

                    <div className="col-md-6">
                        <Routes>
                            <Route
                                path="/register"
                                element={<Register />}
                            ></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/logout" element={<Logout />}></Route>

                            <Route
                                path="/profile/myPosts"
                                element={
                                    <>
                                        <GeneralFeed
                                            url="/profile/myPosts"
                                            post={true}
                                        />
                                    </>
                                }
                            ></Route>
                            <Route
                                path="/profile/favorites"
                                element={
                                    <>
                                        <GeneralFeed
                                            url="/profile/favorites"
                                            post={true}
                                        />
                                    </>
                                }
                            ></Route>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <GeneralFeed />
                                    </>
                                }
                            ></Route>
                        </Routes>
                    </div>
                    <div className="col-md-3">
                        <Messaging />
                    </div>
                </div>
            </div>
        </>
    );
};

render(
    <BrowserRouter>
        <Galaxy />
    </BrowserRouter>,
    document.getElementById("root")
);
