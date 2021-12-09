import { Avatar, Button } from "@material-ui/core";
import React, { useState } from "react";

function GalaxyBox() {
    const [galaxyMessage, setGalaxyMessage] = useState("");
    // const [galaxyImage, setGalaxyImage] = useState("");

    const sendGalaxy = async (e) => {
        e.preventDefault();

        const req = await fetch("http://localhost:5600/", {
            method: "POST",
            body: new FormData(e.target),
        });
        if (req.ok) {
            const res = await req.json();
            console.log(res);
        }
    };

    return (
        <div className="galaxyBox">
            <form onSubmit={sendGalaxy} encType="multipart/form-data">
                <div className="galaxyBox__input">
                    <Avatar src="https://scontent-bom1-1.xx.fbcdn.net/v/t1.0-1/c0.33.200.200a/p200x200/51099653_766820610355014_8315780769297465344_o.jpg?_nc_cat=101&_nc_sid=7206a8&_nc_ohc=c1qBHkwAgVsAX8KynKU&_nc_ht=scontent-bom1-1.xx&oh=340b05bea693dd1671296e0c2d004bb3&oe=5F84CA62" />
                    <textarea id="text" name="text"></textarea>
                </div>
                <input
                    type="file"
                    name="file"
                    id="file"
                    className="galaxyBox__imageInput"
                />
                <Button type="submit" className="galaxyBox__button">
                    Send
                </Button>
            </form>
        </div>
    );
}

export default GalaxyBox;
