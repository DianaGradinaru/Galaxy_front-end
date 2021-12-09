import { Avatar } from "@material-ui/core";
import {
    ChatBubbleOutline,
    FavoriteBorder,
    Publish,
    Repeat,
    // VerifiedUser,
} from "@material-ui/icons";
import React from "react";

function Post({ displayName, username, verified, text, image, avatar }) {
    return (
        <div className="post">
            <div className="post__body">
                <div className="post__header">
                    {/* <div className="post__headerText">
                        <h3>{displayName} </h3>
                    </div> */}
                    <div className="post__headerDescription">
                        <p>{text}</p>
                    </div>
                </div>
                <img src={`data:image/png;base64,${image}`} alt="" />
                <div className="post__footer">
                    <ChatBubbleOutline fontSize="small" />
                    <Repeat fontSize="small" />
                    <FavoriteBorder fontSize="small" />
                    <Publish fontSize="small" />
                </div>
            </div>
        </div>
    );
}

export default Post;
