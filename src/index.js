import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import PostForm from "./components/PostForm";
import Feed from "./components/Feed";
import LeftMenu from "./components/LeftMenu";
import UserPage from "./components/UserPage";

const Galaxy = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-3 mt-5">
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
                                path="/profile"
                                element={<UserPage />}
                            ></Route>
                            <Route
                                path="/profile/myPosts"
                                element={
                                    <>
                                        <PostForm />
                                        <Feed is_private={true} />
                                    </>
                                }
                            ></Route>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <PostForm />
                                        <Feed is_private={false} />
                                    </>
                                }
                            ></Route>
                        </Routes>
                    </div>
                    <div className="col-md-3"></div>
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
