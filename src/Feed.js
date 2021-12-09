import React, { useEffect, useState } from "react";
import Post from "./Post";
import GalaxyBox from "./GalaxyBox";
import axios from "axios";

function Feed() {
    const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     db.collection("posts").onSnapshot((snapshot) => {
    //         setPosts(snapshot.docs.map((doc) => doc.data()));
    //     });
    // }, []);

    useEffect(() => {
        axios
            .get("http://localhost:5600/")
            .then((data) => {
                setPosts(data.data);
            })
            .catch((e) => console.error(e));
    });

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <GalaxyBox />
            {posts.map((data) => (
                <Post text={data.text} image={data.image} />
            ))}
        </div>
    );
}

export default Feed;
