import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import PostForm from "./components/PostForm";
import Feed from "./components/Feed";

const Galaxy = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-3">Sidebar</div>
                    <div className="col-md-6">
                        <Routes>
                            <Route
                                path="/register"
                                element={<Register />}
                            ></Route>
                            <Route path="/" element={<PostForm />}></Route>
                        </Routes>
                        <Feed />
                    </div>
                    <div className="col-md-3">Sidebar</div>
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
