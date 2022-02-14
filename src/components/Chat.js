import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room, user_id }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    let date = new Date(Date.now());
    let hours = `0${date.getHours()}`.slice(-2);
    let minutes = `0${date.getMinutes()}`.slice(-2);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                user_id: user_id,
                message: currentMessage,
                time: hours + ":" + minutes,
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
            console.log(messageData);
            // console.log(user)
        }
    };

    const sendMessageToDb = async () => {
        const request = await fetch(
            process.env.REACT_APP_SERVER_URL + "/messages",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    room: room,
                    author: username,
                    user_id: user_id,
                    message: currentMessage,
                }),
            }
        );
        const response = await request.json();
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header"></div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                            <div
                                className="message"
                                id={
                                    username === messageContent.author
                                        ? "other"
                                        : "you"
                                }
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">
                                            {messageContent.author}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>

            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hey..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" &&
                            sendMessage() &&
                            sendMessageToDb();
                    }}
                />
                <button onClick={sendMessage && sendMessageToDb}>
                    &#9658;
                </button>
            </div>
        </div>
    );
}

export default Chat;
